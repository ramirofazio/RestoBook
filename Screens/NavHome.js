//----------REACT UTILS-----------
import React, { useState, useEffect } from "react";
//
//
//----------REDUX UTILS-----------
import { useDispatch, useSelector } from "react-redux";
import CurrentId from "../Redux/Actions/CurrentId.js";
//
//
//----------REACT-NATIVE UTILS-----------
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import UserOutlined from "react-native-vector-icons/AntDesign";
import TagOutlined from "react-native-vector-icons/AntDesign";
import RestOutlined from "react-native-vector-icons/AntDesign";
//
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot, collection, query } from "firebase/firestore";
//
//
//---------SCREENS & COMPONENTS---------------
import Btn from "./Helpers/Btns.js";
//
//
//-------STYLES-------
import globalStyles from "./GlobalStyles.js";

//
//
//-------INITIALIZATIONS-------

const auth = getAuth();

export default function NavHome({ title, navigation }) {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.currentId);
  //Esto lo tenemos que manejar con una propiedad de cada user, dsps lo corregimos
  const [commerce, isCommerce] = useState(false);
  const loggedId = useSelector((state) => state.currentId);
  useEffect(() => {
    const q = query(collection(firebase.db, "Restos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj.idResto = doc.id;

        if (obj.id === loggedId) {
          isCommerce(true);
        }
      });
      console.log("commerce?", commerce);
    });
  }, [loggedId]);

  //__________________________________________________________________________________
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (!usuarioFirebase?.emailVerified) {
      dispatch(CurrentId(null));
      isCommerce(false);
    }
  });

  const signOutAndAlert = () => {
    signOut(auth);
  };

  return (
    <View style={globalStyles.navHome}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 15,
          marginHorizontal: -13,
        }}
      >
        <View style={globalStyles.containerTitle}>
          <Image
            source={require("../assets/icon.png")}
            style={globalStyles.img}
          />
          <Text style={globalStyles.title}>{title}</Text>
        </View>
        <View style={globalStyles.btnContainer}>
          {/* <Btn nombre="Login" ruta="GlobalLogin" navigation={navigation} /> */}
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={() =>
              currentId ? signOutAndAlert() : navigation.navigate("GlobalLogin")
            }
          >
            <Text>{currentId ? "Log out" : "Log in"}</Text>
          </TouchableOpacity>

          {!commerce && loggedId && (
            <Btn
              nombre={<UserOutlined name="user" color="#392c28" size={15} />}
              ruta="DetailsUser"
              navigation={navigation}
            />
          )}

          {commerce && loggedId && (
            <Btn
              nombre={<RestOutlined name="rest" color="#392c28" size={15} />}
              ruta="DetailsUser"
              navigation={navigation}
            />
          )}
        </View>
      </View>
    </View>
  );
}
