import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Btn from './Helpers/Btns.js'
import globalStyles from './GlobalStyles.js';
import UserOutlined from 'react-native-vector-icons/AntDesign';
import TagOutlined from 'react-native-vector-icons/AntDesign';
import firebase from "../database/firebase";
import fireAuth from "../database/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();


export default function Nav({ title, navigation }) {

  const [usuarioGlobal, setUsuarioGlobal] = useState("");
  const [logged, setLogged] = useState(false);

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
    <View style={globalStyles.navHome}>
      <View style={globalStyles.containerTitle}>
        <Image source={require('../assets/icon.png')} style={globalStyles.img} />
        <Text style={globalStyles.title}>{title}</Text>
      </View>
      <View style={globalStyles.btnContainer}>
        {/* <Btn nombre="Login" ruta="GlobalLogin" navigation={navigation} /> */}
        <TouchableOpacity
          onPress={() =>
            logged ? signOutAndAlert() : navigation.navigate("GlobalLogin")
          }
        >
          <Text>{logged ? "Cerrar Sesion" : "Login"}</Text>
        </TouchableOpacity>
        <Btn nombre={<TagOutlined name='tag' color="#392c28" size={15} />} ruta="#" navigation={navigation} />
        <Btn nombre={<UserOutlined name='user' color="#392c28" size={15} />} ruta="#" navigation={navigation} />
      </View>
    </View>
  )
}

