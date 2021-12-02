//----------REACT UTILS-----------
import React, { useState } from "react";

//
//
//----------REDUX UTILS-----------
import { useSelector } from "react-redux";
//
//
//----------REACT-NATIVE UTILS-----------
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
//
//
//----------FIREBASE UTILS-----------
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
//
//---------------------------------------------------------------------------------------//
//

export default function NavDetail({ navigation }) {
  const empresaDetail = useSelector((state) => state.empresaDetail);
  const [logged, setLogged] = useState(false);
  const [owner, isOwner] = useState(false);
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase?.emailVerified) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  });
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (empresaDetail.id === usuarioFirebase.uid) {
        isOwner(true);
      } else {
        isOwner(false);
      }
    } else {
      isOwner(false);
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.navDetail}>
        <View style={styles.info}>
          <Image
            source={require("../assets/icon.png")}
            style={globalStyles.img}
          />
          <Text style={styles.title}>Resto Book</Text>
        </View>
        <View style={styles.btnMenu}>
          <Btn
            nombre="Add Food!"
            ruta="AddMenuResto"
            navigation={navigation}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "black",
  },
  navDetail: {
    //backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    alignItems: "center",
    flexDirection: "row",
    //backgroundColor: "blue",
  },
  title: {
    //backgroundColor: "green",
    fontSize: 25,
    fontWeight: "bold",
    color: "#392c28",
    marginHorizontal: 15,
  },
  btnHome: {
    // backgroundColor: "black",
  },
  btnMenu: {},
});
