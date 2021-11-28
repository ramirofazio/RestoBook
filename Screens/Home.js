import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,

} from 'react-native';
import CardHome from '../components/CardHome.js'
import BtnFuncional from './Helpers/BtnFuncional.js';
import Btn from './Helpers/Btns.js'

//----------FIREBASE-----------
import firebase from "../database/firebase";
import fireAuth from "../database/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

//-------STYLES-------
import globalStyles from './GlobalStyles.js';
s
const auth = getAuth();
export default function Home({ navigation }) {

  const Restos = [
    {
      Id: 1,
      Title: "McDonald's",
      Description: "McDonald's es una franquicia de restaurantes de comida rápida estadounidense con sede en Chicago, Illinois.​ Sus principales productos son las hamburguesas, las patatas fritas, los menús para el desayuno y los refrescos. ",
      Img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    },
    {
      Id: 2,
      Title: "Los pollos Hermanos",
      Description: "Los Pollos Hermanos es un restaurante de comida rápida de pollo frito que se originó en las series de televisión Breaking Bad y Better Call Saul.",
      Img: "https://blog-eeuu.com/wp-content/uploads/2018/08/breaking-bad-logo.jpeg",
    },
    {
      Id: 3,
      Title: "Burger King",
      Description: "Burger King, también conocida como BK, ​ es una cadena de establecimientos de comida rápida estadounidense con sede central en Miami, Florida, fundada por James McLamore y David Edgerton, presente a nivel internacional y especializada principalmente en la elaboración de hamburguesas.",
      Img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/800px-Burger_King_2020.svg.png",
    }

  ]

  //------LOGIN JOSE------------
  const [usuarioGlobal, setUsuarioGlobal] = useState("");
  const [logged, setLogged] = useState(false);
  const empresas = useSelector((state) => state.empresas);
  console.log("empresas", empresas);

  // window.location.reload
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (usuarioFirebase.displayName) {
        setUsuarioGlobal(usuarioFirebase.displayName);
      } else {
        setUsuarioGlobal(usuarioFirebase.email);
      }
      setLogged(true);
      console.log("userFirebase", usuarioFirebase);
    } else {
      setLogged(false);
      setUsuarioGlobal("");
    }
  });

  return (
    <ScrollView style={globalStyles.Home}>
      <View>
        {usuarioGlobal !== "" ? (
          <Text>{`Bienvenido ${usuarioGlobal}`}</Text>
        ) : null}
      </View>
      <View style={globalStyles.btnHome}>
        {/* <Btn nombre="Ciudad" ruta="#" navigation={navigation} /> */}
        {/* <Btn nombre='Buscar' ruta='#' navigation={navigation} /> */}
        {/* <Btn nombre="Categorias" ruta="#" navigation={navigation} /> */}
        {logged ? <Btn nombre="Create your Resto!" ruta="RegisterResto" navigation={navigation} /> : null}
      </View>

      <ScrollView style={{ overflow: "scroll" }}>
        {Restos.map(resto => {
          return (
            <CardHome key={resto.Id} resto={resto} navigation={navigation}> </CardHome>
          )
        }
        )}
      </ScrollView>

    </ScrollView>
  )
}




