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

const Despedida = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("RestoBook");
    }, 1500);
  }, []);
  return (
    <View>
      <ScrollView>
        <View>
          <Text>Gracias por usar RestoBook!</Text>
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
export default Despedida;
