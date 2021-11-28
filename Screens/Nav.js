import React, { useState, useEffect } from "react";
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   ViewPropTypes,
//   useWindowDimensions,
// } from "react-native";
import firebase from "../database/firebase";
import fireAuth from "../database/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Btn from "./Helpers/Btns.js";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
const auth = getAuth();

// import React from "react";

// import Btn from "./Helpers/Btns.js";

export default function Nav({ title, navigation }) {
  const [usuarioGlobal, setUsuarioGlobal] = useState("");
  const [logged, setLogged] = useState(false);
  //   useEffect(() => {
  //     navigation.navigate("GlobalLogin");
  //     console.log("logged desde NAv", logged);
  //   }, logged);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (usuarioFirebase.displayName) {
        setUsuarioGlobal(usuarioFirebase.displayName);
      } else {
        setUsuarioGlobal(usuarioFirebase.email);
      }
      setLogged(true);
      //   console.log("userFirebase", usuarioFirebase);
    } else {
      setLogged(false);
    }
    // setLogged(false);
  });

  const signOutAndAlert = () => {
    signOut(auth);

    // window.location.reload(); //recarga la pagina, ver si anda en el celu
    setLogged(false);
    // navigation.navigate("Despedida");
  };

  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <Image
        source={require("../assets/icon.png")}
        style={{ width: 30, height: 30 }}
      />
      <Text>{title}</Text>
      <TouchableOpacity
        style={styles.touch}
        onPress={() =>
          logged ? signOutAndAlert() : navigation.navigate("GlobalLogin")
        }
      >
        <Text>{logged ? "Cerrar Sesion" : "Login"}</Text>
      </TouchableOpacity>

      <Btn nombre="Reservas" ruta="#" navigation={navigation} />

      <Btn nombre="Perfil" ruta="#" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 20,
    width: 100,
    height: 50,
  },
  touch: {
    flex: 1,
    padding: 2,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },
});
