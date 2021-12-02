//----------REACT UTILS-----------
import React, { useState } from "react";
//
//
//----------REDUX UTILS-----------

//
//
//----------FORMIK UTILS-----------
import { Formik } from "formik";
//
//
//----------REACT-NATIVE UTILS-----------
import {
  View,
  Button,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
//
//
//----------FIREBASE UTILS-----------
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import firebase from "../database/firebase";
//
//
//---------SCREENS & COMPONENTS---------------

//
//
//-------ICONS-------
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"; //SE BORRA?
//
//
//-------STYLES-------
import globalStyles from "./GlobalStyles";
//
//
//-------INITIALIZATIONS-------
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
//
//-------YUP(Validacion)------
import * as yup from 'yup';
//
//---------------------------------------------------------------------------------------//
//

const GlobalLoginSchema = yup.object({
  email: yup.string()
    .required()
    .email(),
  password: yup.string()
    .required()
    .min(5)
    .max(12)
})

export default GlobalLogin = ({ navigation }) => {

  // const secureTextEntry = (handleChange) => {
  //   handleChange(false)
  // }

  const [flagLoginOrRegister, setFlagLoginOrRegister] = useState(true)
  const [flagSecureText, setFlagSecureText] = useState(true)

  if (flagLoginOrRegister) {
    return (
      //------------LOGIN---------------
      <View style={globalStyles.Home}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={GlobalLoginSchema}
          onSubmit={async ({ email, password }) => {
            try {
              const newUser = await signInWithEmailAndPassword(auth, email, password);
              if (auth.currentUser.emailVerified) {
                alert("Welcome");
                navigation.navigate("RestoBook");
              } else {
                navigation.navigate("AwaitEmail")
              }
            } catch (err) {
              alert(err)
            }
          }}
        >
          {(props) => (
            <View style={globalStyles.inputContainer}>
              <View style={globalStyles.inputComponent}>
                <TextInput
                  style={globalStyles.texts}
                  placeholder="Email"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
              </View>
              {props.touched.email && props.errors.email ? <Text>{props.errors.email}</Text> : null}
              <View style={globalStyles.inputComponent}>
                <TextInput
                  style={globalStyles.texts}
                  placeholder="password"
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  secureTextEntry={flagSecureText}
                  onBlur={props.handleBlur("password")}
                />
              </View>
              {props.touched.password && props.errors.password ? <Text>{props.errors.password}</Text> : null}
              <TouchableOpacity
                onPress={() => flagSecureText ? setFlagSecureText(false) : setFlagSecureText(true)}
              >
                <Icon name={flagSecureText ? "eye-off" : "eye"} size={20} />
              </TouchableOpacity>
              <View style={globalStyles.container}>
                <TouchableOpacity
                  style={globalStyles.touchLog}
                  onPress={() => props.handleSubmit()}
                >
                  <Text style={globalStyles.fontLog}>Log In</Text>
                </TouchableOpacity>
                <Text onPress={() => setFlagLoginOrRegister(false)}>I dont have an account yet</Text>
              </View>
            </View >
          )}
        </Formik >
      </View >
    )
  } else {
    return (
      //-------REGISTER-------------
      <View style={globalStyles.Home}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={GlobalLoginSchema}
          onSubmit={async ({ email, password }) => {
            try {
              await createUserWithEmailAndPassword(auth, email, password);
              onAuthStateChanged(auth, (usuarioFirebase) => {
                if (usuarioFirebase) {
                  sendEmailVerification(auth.currentUser)
                    .then(alert("Sign Up!"))
                    .then(navigation.navigate("AwaitEmail"));
                }
              });
            } catch (err) {
              alert(err)
            }
          }}
        >
          {(props) => (
            <View style={globalStyles.inputContainer}>
              <View style={globalStyles.inputComponent}>
                <TextInput
                  style={globalStyles.texts}
                  placeholder="Email"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
              </View>
              {props.touched.email && props.errors.email ? <Text>{props.errors.email}</Text> : null}
              <View style={globalStyles.inputComponent}>
                <TextInput
                  style={globalStyles.texts}
                  placeholder="password"
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  secureTextEntry={flagSecureText}
                  onBlur={props.handleBlur("password")}
                />
              </View>
              {props.touched.password && props.errors.password ? <Text>{props.errors.password}</Text> : null}
              <TouchableOpacity
                onPress={() => flagSecureText ? setFlagSecureText(false) : setFlagSecureText(true)}
              >
                <Icon name={flagSecureText ? "eye-off" : "eye"} size={20} />
              </TouchableOpacity>
              <View style={globalStyles.container}>
                <TouchableOpacity
                  style={globalStyles.touchLog}
                  onPress={() => props.handleSubmit()}
                >
                  <Text style={globalStyles.fontLog}>Sign Up</Text>
                </TouchableOpacity>
                <Text onPress={() => setFlagLoginOrRegister(true)}>I have an account</Text>
              </View>
            </View >
          )}
        </Formik >
      </View>
    )
  };
};
