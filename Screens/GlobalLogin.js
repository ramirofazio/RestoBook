import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import globalStyles from "./GlobalStyles";
import {addDoc,collection} from "firebase/firestore";
import db from "../database/firebase";
// ESTA import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
// ESTA import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
//import { useScrollToTop } from "@react-navigation/native";

//ERAN ESSAS 2 LIBRERIAS LAS DEL ERROR 505

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const GlobalLogin = ({ navigation }) => {
  const [user, setUser] = useState({
    mail: "",
    password: "",
    secureTextEntry: true,
    iconName: "eye",
  });
  const [registered, setRegistered] = useState(true);

  const email = user.mail;
  const pass = user.password;

  const handleChangeUser = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const logUserWithGoogle = async () => {
    try {
      const newUser = await signInWithRedirect(auth, googleProvider);
      if (auth.currentUser) {
        console.log("works");
        props.navigation.navigate("RestoBook");
      } else {
        console.log("NO works");
      }
    } catch (error) {
      alert("error!");
      console.log(error);
    }
  };

  const logEmpresa = async () => {
    try {
      const newUser = await signInWithEmailAndPassword(auth, email, pass);
      const UserRef = await addDoc(collection(db, "User"), 
        {password: user.password, email:user.mail});
      if (auth.currentUser.emailVerified) {
        alert("Welcome");
        navigation.navigate("RestoBook");
      } else {
        navigation.navigate("AwaitEmail");
      }
    } catch (error) {
      const errorCode = error.code;
      console.log("errorCode", errorCode);
      switch (errorCode) {
        case "auth/wrong-password":
          alert("Wrong password");
          break;
        case "auth/user-not-found":
          alert("User not found");
        case "auth/internal-error":
          alert("Enter your password!");
        default:
          alert("Error");
      }
    }
  };

  const saveEmpresa = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      onAuthStateChanged(auth, (usuarioFirebase) => {
        if (usuarioFirebase) {
          sendEmailVerification(auth.currentUser)
            .then(handleChangeUser("mail", ""))
            .then(handleChangeUser("password", ""))
            .then(navigation.navigate("AwaitEmail"));
        }
      });
    } catch (error) {
      const errorCode = error.code;
      console.log("errorCode", errorCode);
      switch (errorCode) {
        case "auth/invalid-email":
          alert("Invalid Email");
          break;
        case "auth/weak-password":
          alert("password must be at least 6 characters");
        case "auth/email-already-in-use":
          alert("Email already in-use");
        default:
          break;
      }
    }
  };

  const buttonText = [
    "Log In",
    "Sign In",
    "I don't have an account yet",
    "I already have an account",
  ];

  const onIconPress = () => {
    let iconName = user.secureTextEntry ? "eye-off" : "eye";
    setUser({
      secureTextEntry: !user.secureTextEntry,
      iconName: iconName,
    });
  };
  return (
    <View style={globalStyles.Home}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={globalStyles.inputContainer}>
          <View style={globalStyles.inputComponent}>
            <TextInput
              style={globalStyles.texts}
              placeholder="Email"
              value={user.mail}
              onChangeText={(value) => handleChangeUser("mail", value)}
            />
          </View>
          <View style={globalStyles.inputComponent}>
            <TextInput
              style={globalStyles.texts}
              onPress={onIconPress}
              secureTextEntry={user.secureTextEntry}
              placeholder="Password"
              value={user.password}
              onChangeText={(value) => handleChangeUser("password", value)}
            />
            {/* <View>
              <TouchableOpacity
                onPress={onIconPress}
                style={styles.inputComponent}
              >
                <Icon name={user.iconName} size={20} />
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
        <View style={globalStyles.container}>
          <TouchableOpacity
            style={globalStyles.touchLog}
            onPress={() => (registered ? logEmpresa() : saveEmpresa())}
          >
            <Text style={globalStyles.fontLog}>
              {registered ? buttonText[0] : buttonText[1]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.touchFlag}
            onPress={() =>
              registered ? setRegistered(false) : setRegistered(true)
            }
          >
            <Text style={globalStyles.fontLog}>
              {registered ? buttonText[2] : buttonText[3]}
            </Text>
          </TouchableOpacity>

          <Text>O</Text>

          <TouchableOpacity
            style={globalStyles.touchLog}
            onPress={() => logUserWithGoogle()}
          >
            <Text style={globalStyles.fontLog}>Sign In With Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  
  

});
export default GlobalLogin;
