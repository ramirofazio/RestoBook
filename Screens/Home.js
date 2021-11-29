import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
} from "react-native";

//----------FIREBASE-----------
import firebase from "../database/firebase";
import fireAuth from "../database/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

//---------SCREENS---------------
import CardHome from "../components/CardHome.js";
import BtnFuncional from "./Helpers/BtnFuncional.js";
import Btn from "./Helpers/Btns.js";

//-------STYLES-------
import globalStyles from "./GlobalStyles.js";

const auth = getAuth();
export default function Home({ navigation }) {
  //------LOGIN JOSE------------
  const [usuarioGlobal, setUsuarioGlobal] = useState("");
  const [logged, setLogged] = useState(false);
  const empresas = useSelector((state) => state.empresas);
  //console.log("empresas", empresas);

  // window.location.reload
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase?.emailVerified) {
      if (usuarioFirebase.displayName) {
        setUsuarioGlobal(usuarioFirebase.displayName);
      } else {
        const trimmedName = usuarioFirebase.email.split("@")[0];
        setUsuarioGlobal(trimmedName);
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
      <View style={styles.textContainer}>
        {usuarioGlobal !== "" ? (
          <Text style={styles.text}>{` Welcome ${usuarioGlobal}`}</Text>
        ) : (
          <Text style={styles.text}>Welcome to Resto Book</Text>
        )}
      </View>
      <View style={globalStyles.btnHome}>
        {/* <Btn nombre="Ciudad" ruta="#" navigation={navigation} /> */}
        {/* <Btn nombre='Buscar' ruta='#' navigation={navigation} /> */}
        {/* <Btn nombre="Categorias" ruta="#" navigation={navigation} /> */}
        {logged ? (
          <Btn
            nombre="Create your Resto!"
            ruta="RegisterResto"
            navigation={navigation}
          />
        ) : null}
        {/* <Btn
          nombre="Create your Resto!"
          ruta="RegisterResto"
          navigation={navigation}
        /> */}

      </View>

      <ScrollView style={{ overflow: "scroll" }}>
        {empresas.map((resto) => {
          return (
            <CardHome key={resto.Id} resto={resto} navigation={navigation}>
              {" "}
            </CardHome>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    borderColor: "#bd967e",
    borderRadius: 10,
    borderWidth: 3,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    paddingVertical: 5,
    fontWeight: "bold",
    color: "#392c28",
  },
});
