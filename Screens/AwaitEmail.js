//----------REACT UTILS-----------
import React, { useEffect } from "react";
//
//
//----------REDUX UTILS-----------

//
//
//----------REACT-NATIVE UTILS-----------
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
//
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase.js";
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

// import { Alert } from 'antd'; PREGUNTAR A LAI Y LUCAS G O BORRAR :)

//
//---------------------------------------------------------------------------------------//
//
const AwaitEmail = ({ navigation }) => {
  return (
    <View style={globalStyles.Home}>
      <View style={globalStyles.textContainer}>
        <Text style={globalStyles.text}>
          {" "}
          Please check your inbox, if it's empty click below
        </Text>
      </View>
      <View style={globalStyles.container}>
        {/* <Button
            title="Reenviar"
            onPress={() => {
              firebase.fireAuth.currentUser.sendEmailVerification();
              alert("Mail enviado. Revisa en spam!!");
            }}
          /> */}
        <TouchableOpacity
          style={globalStyles.touchLog}
          onPress={() => {
            firebase.fireAuth.currentUser.sendEmailVerification();
            alert("Email sent. Check unwanted section!!");
            // <Alert
            //   message="Informational Notes"
            //   description="Additional description and information about copywriting."
            //   type="info"
            //   showIcon
            //   closable
            // />
          }}
        >
          <Text style={globalStyles.fontLog}>Resend</Text>
        </TouchableOpacity>

        {/* <Button
            title="ir a Login"
            onPress={() => navigation.navigate("GlobalLogin")}
          /> */}
        <TouchableOpacity
          style={globalStyles.touchFlag}
          onPress={() => navigation.navigate("GlobalLogin")}
        >
          <Text style={globalStyles.fontLog}>Go back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default AwaitEmail;
