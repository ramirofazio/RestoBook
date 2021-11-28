import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes,
  useWindowDimensions,
} from "react-native";
import firebase from "../database/firebase";
import fireAuth from "../database/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import Btn from "./Helpers/Btns.js";
const auth = getAuth();
export default function Home({ navigation }) {
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

  // const signOutAndAlert = () => {
  //   signOut(auth);
  //   // alert("chau!");
  //   window.location.reload(); //recarga la pagina, ver si anda en el celu
  // };

  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View>
        {usuarioGlobal !== "" ? (
          <Text>{`Bienvenido ${usuarioGlobal}`}</Text>
        ) : null}
      </View>
      <View style={styles.btnContainer}>
        <Btn nombre="Ciudad" ruta="#" navigation={navigation} />
        <Btn nombre="Categorias" ruta="#" navigation={navigation} />
        <Btn
          nombre="DetailsResto"
          ruta="DetailsResto"
          navigation={navigation}
        />
      </View>
      {logged ? (
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate("RegisterResto")}
        >
          <Text>Crea tu comercio!</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate("RegisterResto")}
          disabled
        >
          <Text>No Crees tu comercio!</Text>
        </TouchableOpacity>
      )}

      {empresas.length
        ? empresas.map((element) => (
            <Text key={empresas.cuit}>{element.fantasyName}</Text>
          ))
        : null}
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
    backgroundColor: "blue",
    marginTop: 20,
    width: 100,
  },
});
