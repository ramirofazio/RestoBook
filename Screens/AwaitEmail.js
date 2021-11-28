import React, { useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import firebase from "../database/firebase.js";

// import {
//   getAuth,
//   onAuthStateChanged,
//   sendEmailVerification,
// } from "firebase/auth";

const AwaitEmail = ({ navigation }) => {
  return (
    <View>
      <ScrollView>
        <View>
          <Text>Revisa tu correo, si no llega hace click abajo</Text>
        </View>
        <View style={styles.buttons}>
          <Button
            title="Reenviar"
            onPress={() => {
              firebase.fireAuth.currentUser.sendEmailVerification();
              alert("Mail enviado. Revisa en spam!!");
            }}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            title="ir a Login"
            onPress={() => navigation.navigate("GlobalLogin")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    marginBottom: 15,
    marginLeft: 150,
    marginRight: 150,
    overflow: "hidden",
    borderRadius: 40,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // alignSelf: "flex-start",
  },
});
export default AwaitEmail;
