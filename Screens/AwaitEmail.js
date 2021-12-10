//----------REACT UTILS-----------
import React from "react";
//
//
//----------REDUX UTILS-----------
import { useDispatch } from "react-redux";
import CurrentId from "../Redux/Actions/CurrentId.js";
import CurrentUser from "../Redux/Actions/CurrentUser.js";
//
//
//----------REACT-NATIVE UTILS-----------
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
//
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase.js";
import { getAuth, signOut } from "firebase/auth";
//
//
//---------SCREENS & COMPONENTS---------------
//
//
//-------STYLES-------
import globalStyles from "./GlobalStyles.js";

//
//
//-------INITIALIZATIONS-------
const auth = getAuth();
// import { Alert } from 'antd'; PREGUNTAR A LAI Y LUCAS G O BORRAR :)
//
//---------------------------------------------------------------------------------------//
//
const AwaitEmail = ({ navigation }) => {
  const dispatch = useDispatch();
  const signOutAndClearRedux = () => {
    signOut(auth);
    dispatch(CurrentUser(null));
    dispatch(CurrentId(null));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffdfcb",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Text style={globalStyles.text}>
        Por favor, chequea tu bandeja de entrada y spam.
      </Text>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={globalStyles.touchLog}
          onPress={() => {
            firebase.fireAuth.currentUser.sendEmailVerification();
            alert("Mail enviado, chequea en Spam!");
          }}
        >
          <Text style={globalStyles.fontLog}>Reenviar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.touchFlag}
          onPress={() => {
            signOutAndClearRedux();
            navigation.navigate("GlobalLogin");
          }}
        >
          <Text style={globalStyles.fontLog}>Volver a Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AwaitEmail;
