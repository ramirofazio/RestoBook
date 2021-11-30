//----------REACT UTILS-----------
import React, { useState, useEffect } from "react";
//
//
//----------REDUX UTILS-----------
import { useDispatch, useSelector } from "react-redux";
import CurrentId from "../Redux/Actions/CurrentId.js";
import CurrentUser from "../Redux/Actions/CurrentUser.js";
//
//
//----------REACT-NATIVE UTILS-----------
import { View, ScrollView, Text, StyleSheet } from "react-native";
//
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, collection, query } from "firebase/firestore";
//
//
//---------SCREENS---------------
import CardHome from "../components/CardHome.js";
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
export default function Home({ navigation }) {
  //------LOGIN JOSE------------
  const [usuarioGlobal, setUsuarioGlobal] = useState("");
  const [availableCommerces, setAvailableCommerces] = useState([]);
  const empresas = useSelector((state) => state.empresas);
  const loggedUser = useSelector((state) => state.currentUser);
  const loggedId = useSelector((state) => state.currentId);
  const dispatch = useDispatch();

  useEffect(() => {});
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (loggedId !== usuarioFirebase.uid) {
        dispatch(CurrentId(usuarioFirebase.uid));
        const unsub = onSnapshot(
          doc(firebase.db, "Test", usuarioFirebase.uid),
          (doc) => {
            if (doc.exists()) {
              dispatch(CurrentUser(doc.data()));
            }
          }
        );
        const q = query(collection(firebase.db, "Test"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let arr = [];
          querySnapshot.forEach((doc) => {
            let obj = doc.data();
            obj.id = doc.id;
            arr.push(obj);
          });
          setAvailableCommerces(arr);
        });
      }
    } else {
      dispatch(CurrentUser(null));
    }
  });

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase?.emailVerified) {
      if (usuarioFirebase.displayName) {
        setUsuarioGlobal(usuarioFirebase.displayName);
      } else {
        const trimmedName = usuarioFirebase.email.split("@")[0];
        setUsuarioGlobal(trimmedName);
      }
    } else {
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
        {/* {logged ? (
          <Btn
            nombre="Create your Resto!"
            ruta="RegisterResto"
            navigation={navigation}
          />
        ) : null} */}
        <Btn
          nombre={
            loggedUser
              ? `Create your resto, ${loggedUser.Description}`
              : `Crea tu resto.`
          }
          ruta="RegisterResto"
          navigation={navigation}
        />
      </View>
      {availableCommerces.length ? (
        <ScrollView style={{ overflow: "scroll" }}>
          {availableCommerces.map((resto) => {
            return (
              <CardHome key={resto.id} resto={resto} navigation={navigation}>
                {" "}
              </CardHome>
            );
          })}
        </ScrollView>
      ) : null}
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
