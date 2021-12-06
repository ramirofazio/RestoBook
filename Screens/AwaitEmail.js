//----------REACT UTILS-----------
import React from "react";
//
//
//----------REDUX UTILS-----------
//
//
//----------REACT-NATIVE UTILS-----------
import {
  View,
  Text,
} from "react-native";
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
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#ffdfcb',
      alignContent: "center",
      justifyContent: "center"
    }}>
      <Text style={globalStyles.text}>
        {" "}
        Please check your inbox, if it's empty click below
      </Text>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={globalStyles.touchLog}
          onPress={() => {
            firebase.fireAuth.currentUser.sendEmailVerification();
            alert("Email sent. Check spam section!!");
          }}
        >
          <Text style={globalStyles.fontLog}>Resend</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.touchFlag}
          onPress={() => {
            signOut(auth);
            navigation.navigate("GlobalLogin");
          }}
        >
          <Text style={globalStyles.fontLog}>Go back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AwaitEmail;
