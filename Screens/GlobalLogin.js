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
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Image,
} from "react-native";

import { BottomSheet } from "react-native-elements";

//----------FIREBASE UTILS-----------
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithCredential,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import firebase from "../database/firebase";
import * as firebaseAuth from "firebase/auth";
//
//
//---------SCREENS & COMPONENTS---------------

//
//
//----------ENV-----------
import {
  GOOGLE_0AUTH_ANDROID_ID,
  GOOGLE_0AUTH_IOS_ID,
  DEFAULT_PROFILE_IMAGE,
} from "@env";
//
//
//---------EXPO---------------
import * as Google from "expo-google-app-auth";
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
const provider = new GoogleAuthProvider();

//const googleProvider = new GoogleAuthProvider();
//
//-------YUP(Validacion)------
import * as yup from "yup";
import Btn from "./Helpers/Btns";
//
//---------------------------------------------------------------------------------------//
//

const GlobalLoginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(12),
});

const GlobalRegisterSchema = yup.object({
  name: yup.string().required(),
  lastName: yup.string().required(),
  cel: yup.number().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(12),
  passwordConfirm: yup
    .string()
    .required()
    .test(
      "password-match",
      "passwords must match",
      async (value, testContext) => testContext.parent.password === value
    ),
});

const GlobalLogin = ({ navigation }) => {
  const [visible, isVisible] = useState(false);
  const [forgottedMail, setForgottedMail] = useState("");

  const Glogin = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: GOOGLE_0AUTH_IOS_ID,
        androidClientId: GOOGLE_0AUTH_ANDROID_ID,
      });

      if (result.type === "success") {
        const credential = firebaseAuth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        console.log("step1");
        // const credential = (result.idToken, result.accessToken);
        signInWithCredential(auth, credential).catch((error) => {
          console.log(error);
          alert("error!");
        });

        navigation.navigate("RestoBook");
      }
    } catch ({ message }) {
      alert("login: Error" + message);
    }
  };

  const [flagLoginOrRegister, setFlagLoginOrRegister] = useState(true);
  const [flagSecureText, setFlagSecureText] = useState(true);

  if (flagLoginOrRegister) {
    return (
      //------------LOGIN---------------

      <View style={globalStyles.Home}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            paddingVertical: 5,
            alignSelf: "center",
            color: "#392c28",
          }}
        >
          Login
        </Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={GlobalLoginSchema}
          onSubmit={async ({ email, password }) => {
            try {
              const newUser = await signInWithEmailAndPassword(
                auth,
                email,
                password
              );
              if (auth.currentUser.emailVerified) {
                alert("Welcome");
                navigation.navigate("RestoBook");
              } else {
                navigation.navigate("AwaitEmail");
              }
            } catch (err) {
              alert(err);
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
              {props.touched.email && props.errors.email ? (
                <Text style={globalStyles.errorText}>{props.errors.email}</Text>
              ) : null}
              <View style={globalStyles.inputComponent}>
                <TextInput
                  style={globalStyles.texts}
                  placeholder="Password"
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  secureTextEntry={flagSecureText}
                  onBlur={props.handleBlur("password")}
                />
              </View>
              {props.touched.password && props.errors.password ? (
                <Text style={globalStyles.errorText}>
                  {props.errors.password}
                </Text>
              ) : null}
              <TouchableOpacity
                style={globalStyles.eye}
                onPress={() =>
                  flagSecureText
                    ? setFlagSecureText(false)
                    : setFlagSecureText(true)
                }
              >
                <Icon
                  name={flagSecureText ? "eye-off" : "eye"}
                  size={20}
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
              <View style={globalStyles.btnContainerLogin}>
                <TouchableOpacity
                  style={globalStyles.touchLog}
                  onPress={() => props.handleSubmit()}
                >
                  <Text style={globalStyles.fontLog}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.googleButton}
                  onPress={() => Glogin()}
                >
                  <Image source={require("../assets/googleIcon.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  style={globalStyles.touchFlag}
                  onPress={() => setFlagLoginOrRegister(false)}
                >
                  <Text style={globalStyles.fontLog}>
                    I dont have an account yet
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={globalStyles.touchFlag}
                  onPress={() => {
                    isVisible(true);
                  }}
                >
                  <Text style={globalStyles.fontLog}>Olvidé mi contraseña</Text>
                </TouchableOpacity>
                <BottomSheet isVisible={visible} style={styles.forgottenPass}>
                  <View>
                    <TextInput
                      placeholder="........"
                      style={styles.inputForgotten}
                      onChangeText={(value) => setForgottedMail(value)}
                    ></TextInput>
                    <TouchableOpacity
                      onPress={() => {
                        sendPasswordResetEmail(auth, forgottedMail)
                          .then(alert("Revisa tu casilla!"))
                          .then(isVisible(false));
                      }}
                    >
                      <Text>Enviar</Text>
                    </TouchableOpacity>
                  </View>
                </BottomSheet>
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  } else {
    return (
      //-------REGISTER-------------
      <View>
        <Modal animationType="slide" transparent={true}>
          <View View style={globalStyles.Home}>
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
                console.log(values);
                try {
                  //-----AUTENTICA USER-----------
                  await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  );
                  onAuthStateChanged(auth, (usuarioFirebase) => {
                    if (usuarioFirebase) {
                      //-----AGREGA A COLECCION USER--------
                      firebase.db
                        .collection("Users")
                        .doc(auth.currentUser.uid)
                        .set({
                          id: auth.currentUser.uid,
                          name: values.name,
                          lastName: values.lastName,
                          cel: values.cel,
                          email: values.email,
                          commerce: false,
                          profileImage: DEFAULT_PROFILE_IMAGE,
                          reservations: [],
                          payments: [],
                        })
                        .then(sendEmailVerification(auth.currentUser))
                        .then(navigation.navigate("AwaitEmail"));
                    }
                  });
                } catch (err) {
                  alert(err);
                }
              }}
            >
              {(props) => (
                <View style={globalStyles.modalInputContainer}>
                  <Text style={styles.modalText}>Register to RestoBook</Text>

                  <View style={globalStyles.inputComponent}>
                    <TextInput
                      style={globalStyles.texts}
                      placeholder="Nombre"
                      onChangeText={props.handleChange("name")}
                      value={props.values.name}
                      onBlur={props.handleBlur("name")}
                    />
                  </View>
                  {props.touched.name && props.errors.name ? (
                    <Text style={globalStyles.errorText}>
                      {props.errors.name}
                    </Text>
                  ) : null}
                  <View style={globalStyles.inputComponent}>
                    <TextInput
                      style={globalStyles.texts}
                      placeholder="Apellido"
                      onChangeText={props.handleChange("lastName")}
                      value={props.values.lastName}
                      onBlur={props.handleBlur("lastName")}
                    />
                  </View>
                  {props.touched.lastName && props.errors.lastName ? (
                    <Text style={globalStyles.errorText}>
                      {props.errors.lastName}
                    </Text>
                  ) : null}
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
                  {props.touched.cel && props.errors.cel ? (
                    <Text style={globalStyles.errorText}>
                      {props.errors.cel}
                    </Text>
                  ) : null}
                  <View style={globalStyles.inputComponent}>
                    <TextInput
                      style={globalStyles.texts}
                      placeholder="Email"
                      onChangeText={props.handleChange("email")}
                      value={props.values.email}
                      onBlur={props.handleBlur("email")}
                    />
                  </View>
                  {props.touched.email && props.errors.email ? (
                    <Text style={globalStyles.errorText}>
                      {props.errors.email}
                    </Text>
                  ) : null}
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
                  {props.touched.password && props.errors.password ? (
                    <Text style={globalStyles.errorText}>
                      {props.errors.password}
                    </Text>
                  ) : null}
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
                  {props.touched.passwordConfirm &&
                  props.errors.passwordConfirm ? (
                    <Text style={globalStyles.errorText}>
                      {props.errors.passwordConfirm}
                    </Text>
                  ) : null}
                  <TouchableOpacity
                    style={globalStyles.eye}
                    onPress={() =>
                      flagSecureText
                        ? setFlagSecureText(false)
                        : setFlagSecureText(true)
                    }
                  >
                    <Icon name={flagSecureText ? "eye-off" : "eye"} size={20} />
                  </TouchableOpacity>
                  <View style={globalStyles.btnContainerLogin}>
                    <TouchableOpacity
                      style={globalStyles.touchLog}
                      onPress={() => {
                        props.handleSubmit() && setFlagLoginOrRegister(true);
                      }}
                    >
                      <Text style={globalStyles.fontLog}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={globalStyles.touchFlag}
                      onPress={() => setFlagLoginOrRegister(true)}
                    >
                      <Text style={globalStyles.fontLog}>
                        I have an account
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </Modal>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    //backgroundColor: "blur",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "50%",
    height: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 30,
      height: 30,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  botton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    //float: "right",
  },
  bottonClose: {
    backgroundColor: "#2196F3",
  },
  googleButton: {
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
});

export default GlobalLogin;
