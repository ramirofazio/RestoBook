//----------REACT UTILS-----------
import React, { useState, useEffect } from "react";
//
//----------REDUX UTILS-----------
import { useDispatch, useSelector } from "react-redux";
import CurrentId from "../Redux/Actions/CurrentId.js";
import CurrentUser from "../Redux/Actions/CurrentUser.js";
import UserFavourites from "../Redux/Actions/userFavourites.js";
//
//
//----------REACT-NATIVE UTILS-----------

import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  BottomSheet,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

//
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, collection, query, getDoc } from "firebase/firestore";
//
//
//---------SCREENS---------------
import SearchBar from "./SearchBar.js";
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
import { DEFAULT_PROFILE_IMAGE } from "@env";

//
//---------------------------------------------------------------------------------------//
//
export default function Home({ navigation }) {
  //------LOGIN JOSE------------
  const [visible, isVisible] = useState(false);
  const [googleUser, setGoogleUser] = useState({
    name: "",
    lastName: "",
    cel: "",
    email: "",
  });
  const [usuarioGlobal, setUsuarioGlobal] = useState("");
  const [availableCommerces, setAvailableCommerces] = useState([]);
  const [flagCards, setFlagCards] = useState(false);
  //console.log(availableCommerces)
  const loggedUser = useSelector((state) => state.currentUser);
  const loggedId = useSelector((state) => state.currentId);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(firebase.db, "Restos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj.idResto = doc.id;
        arr.push(obj);
      });
      setAvailableCommerces(arr);
    });
  }, []);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase?.emailVerified) {
      //console.log(loggedId)
      if (loggedId !== usuarioFirebase.uid) {
        dispatch(CurrentId(usuarioFirebase.uid));
        const unsub = onSnapshot(
          doc(firebase.db, "Restos", usuarioFirebase.uid),
          (doc) => {
            if (doc.exists()) {
              dispatch(CurrentUser(doc.data()));
              //console.log("data user en home : ", doc.data());
            }
          }
        );
      }
    } else {
      dispatch(CurrentUser(null));
    }
  });

  const getInfo = async () => {
    try {
      const docRef = doc(firebase.db, "Users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        setGoogleUser({ ...googleUser, email: auth.currentUser.email });
        isVisible(true);
        // alert("Bienvenido! Por favor, completa estos datos antes de continuar");
      } else {
        let obj = docSnap.data();
        let idsFavourites = obj.favourites.map((element) => element.id);
        dispatch(UserFavourites(idsFavourites));
        setFlagCards(true);
      }
    } catch (e) {
      console.log("error get", e);
    }
  };
  useEffect(() => {
    if (loggedId && auth.currentUser.uid) {
      getInfo();
    }
    setFlagCards(true);
  }, [loggedId]);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase?.emailVerified) {
      if (usuarioFirebase.displayName) {
        console.log("entre a if")
        setUsuarioGlobal(usuarioFirebase.displayName);
      } else {
        console.log("entre a else")
        const trimmedName = usuarioFirebase.email.split("@")[0];
        setUsuarioGlobal(trimmedName);
      }
    } else {
      console.log("entre a else else")
      setUsuarioGlobal("");
    }
  });

  return (
    <ScrollView style={globalStyles.Home}>
      {/* <BottomSheet isVisible={false}>
        <View>
          <Text>Hola!</Text>
        </View>
      </BottomSheet> */}
      <Modal visible={visible} style={styles.googleUserModal}>
        <View style={styles.googleUserForm}>
          <TextInput
            style={styles.googleTextinput}
            placeholder="Nombre"
            onChangeText={(value) => {
              setGoogleUser({
                ...googleUser,
                name: value,
              });
            }}
          />
          <TextInput
            placeholder="Apellido"
            onChangeText={(value) => {
              setGoogleUser({
                ...googleUser,
                lastName: value,
              });
            }}
          />
          <TextInput
            placeholder="Celular"
            onChangeText={(value) => {
              setGoogleUser({
                ...googleUser,
                cel: value,
              });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              firebase.db.collection("Users").doc(auth.currentUser.uid).set({
                id: auth.currentUser.uid,
                name: googleUser.name,
                lastName: googleUser.lastName,
                cel: googleUser.cel,
                email: googleUser.email,
                commerce: false,
                profileImage: DEFAULT_PROFILE_IMAGE,
                reservations: [],
                payments: [],
              });
              isVisible(false);
              alert("Gracias!");
            }}
          >
            <Text>Enviar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.textContainer}>
        {usuarioGlobal !== "" ? (
          <Text style={styles.text}>{` Welcome ${usuarioGlobal}`}</Text>
        ) : (
          <Text style={styles.text}>Welcome to Resto Book</Text>
        )}
      </View>
      <View>
        <SearchBar />
      </View>

      <View style={globalStyles.btnHome}>
        {/* <Btn nombre="Categorias" ruta="#" navigation={navigation} /> */}
        <Btn
          nombre={
            usuarioGlobal !== ""
              ? `Create your resto, ${usuarioGlobal}!`
              : `Crea tu resto!`
          }
          ruta="RegisterResto"
          navigation={navigation}
        />
      </View>
      {availableCommerces.length && flagCards ? (
        <View>
          {availableCommerces.map((resto) => {
            return (
              <CardHome
                key={resto.idResto}
                resto={resto}
                navigation={navigation}
              ></CardHome>
            );
          })}
        </View>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#5555" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    borderColor: "#bd967e",
    borderRadius: 10,
    borderWidth: 3,
    marginTop: 10,
  },
  textContainer2: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    width: "40%",
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

  textContainer2: {
    alignSelf: "center",
    justifyContent: "center",
    width: "40%",
    borderRadius: 10,
    borderWidth: 3,
    marginTop: 10,
  },
  forgottenPass: {
    backgroundColor: "antiquewhite",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderBottomWidth: 5,
    borderBottomColor: "black",
  },

  inputForgotten: {
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "orange",
  },
  // googleUserModal: {
  //   backgroundColor: "#f0f",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  googleUserForm: {
    backgroundColor: "grey",
    padding: 20,
    // textAlign: "center",
    // justifyContent: "center",
    // alignContent: "center",
  },
  googleTextinput: {
    padding: 10,
  },
  loading: {
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
});
