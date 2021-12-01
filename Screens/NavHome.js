//----------REACT UTILS-----------
import React, { useState } from "react";
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
//
//
//----------FIREBASE UTILS-----------
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (!usuarioFirebase?.emailVerified) {
      dispatch(CurrentId(null));
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
          <Btn
            nombre={<TagOutlined name="tag" color="#392c28" size={15} />}
            ruta="#"
            navigation={navigation}
          />
          <Btn
            nombre={<UserOutlined name="user" color="#392c28" size={15} />}
            ruta="#"
            navigation={navigation}
          />
        </View>
      </View>
    </View>
  );
}
