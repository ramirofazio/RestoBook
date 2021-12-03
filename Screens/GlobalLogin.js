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
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
//
//
//----------FIREBASE UTILS-----------
import {
  getAuth,
  signInWithEmailAndPassword,
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
//const googleProvider = new GoogleAuthProvider();
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
    .min(6)
    .max(12)
})

const GlobalLogin = ({ navigation }) => {

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

    const GlobalRegisterSchema = yup.object({
      name: yup.string()
        .required(),
      lastName: yup.string()
        .required(),
      cel: yup.number()
        .required(),
      email: yup.string()
        .required()
        .email(),
      password: yup.string()
        .required()
        .min(6)
        .max(12),
      passwordConfirm: yup.string()
        .required()
        .test("password-match",
          "passwords must match",
          async (value, testContext) => testContext.parent.password === value,
        )
    })

    return (
      //-------REGISTER-------------
      <View style={globalStyles.Home}>
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            cel: "",
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={GlobalRegisterSchema}
          onSubmit={async (values) => {
            console.log(values)
            try {
              //-----AUTENTICA USER-----------
              await createUserWithEmailAndPassword(auth, values.email, values.password);
              onAuthStateChanged(auth, (usuarioFirebase) => {
                if (usuarioFirebase) {
                  //-----AGREGA A COLECCION USER--------
                  firebase.db.collection("Users").doc(auth.currentUser.uid).set({
                    id: auth.currentUser.uid,
                    name: values.name,
                    lastName: values.lastName,
                    cel: values.cel,
                    email: values.email,
                    commerce: false,
                    reservations: [],
                    payments: [],
                  })
                    .then(sendEmailVerification(auth.currentUser))
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
                  placeholder="Nombre"
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                  onBlur={props.handleBlur("name")}
                />
              </View>
              {props.touched.name && props.errors.name ? <Text>{props.errors.name}</Text> : null}
              <View style={globalStyles.inputComponent}>
                <TextInput
                  style={globalStyles.texts}
                  placeholder="Apellido"
                  onChangeText={props.handleChange("lastName")}
                  value={props.values.lastName}
                  onBlur={props.handleBlur("lastName")}
                />
              </View>
              {props.touched.lastName && props.errors.lastName ? <Text>{props.errors.lastName}</Text> : null}
              <View style={globalStyles.inputComponent}>
                <TextInput
                  style={globalStyles.texts}
                  placeholder="Telephone"
                  onChangeText={props.handleChange("cel")}
                  value={props.values.cel}
                  onBlur={props.handleBlur("cel")}
                  keyboardType="numeric"
                />
              </View>
              {props.touched.cel && props.errors.cel ? <Text>{props.errors.cel}</Text> : null}
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
              <View style={globalStyles.inputComponent}>
                <TextInput
                  style={globalStyles.texts}
                  placeholder="Confirm password"
                  onChangeText={props.handleChange("passwordConfirm")}
                  value={props.values.passwordConfirm}
                  secureTextEntry={flagSecureText}
                  onBlur={props.handleBlur("passwordConfirm")}
                />
              </View>
              {props.touched.passwordConfirm && props.errors.passwordConfirm ? <Text>{props.errors.passwordConfirm}</Text> : null}
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
      </View >
    )
  };
};
export default GlobalLogin;

