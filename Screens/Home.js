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

const auth = getAuth();
export default function Home({ navigation }) {


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
        { /*logged ? <Btn nombre="Create your Resto!" ruta="RegisterResto" navigation={navigation} /> : null */}
        <Btn nombre="Create your Resto!" ruta="RegisterResto" navigation={navigation} />
      </View>

      <ScrollView style={{ overflow: "scroll" }}>
        {empresas.map(resto => {
          return (
            <CardHome key={resto.Id} resto={resto} navigation={navigation}> </CardHome>
          )
        }
        )}
      </ScrollView>

    </ScrollView>
  )
}




