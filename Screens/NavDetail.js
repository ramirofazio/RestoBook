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
      if (empresaDetail.idUser === usuarioFirebase.uid) {
        isOwner(true);
      } else {
        isOwner(false);
      }
    } else {
      isOwner(false);
    }
  });
  return (
    <View style={globalStyles.navHome}>
      <View style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          paddingHorizontal: 5,
          marginHorizontal: -10,
        }}>
        <View style={globalStyles.containerTitle}>
          <Text style={globalStyles.title}>Resto Book</Text>
        </View>
        <View style={globalStyles.btnContainer}>
            {owner &&
              <Btn
                nombre="Agregar Comida!"
                ruta="AddMenuResto"
                navigation={navigation}
              />
            }
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
