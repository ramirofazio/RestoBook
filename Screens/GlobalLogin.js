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
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
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
      if (auth.currentUser.emailVerified) {
        alert("Welcome");
        navigation.navigate("RestoBook");
      } else {
        navigation.navigate("AwaitEmail");
      }
    } catch (error) {
      alert("error!!");
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
      alert("error en save", error);
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
        <View style={styles.inputContainer}>
          <View style={styles.inputComponent}>
            <TextInput
              style={styles.texts}
              placeholder="Email"
              value={user.mail}
              onChangeText={(value) => handleChangeUser("mail", value)}
            />
          </View>
          <View style={styles.inputComponent}>
            <TextInput
              style={styles.texts}
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
  texts: {
    textAlign: "center",
    width: "100%",
    fontSize: 14.5,
    fontWeight: "bold",
  },
  inputContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputComponent: {
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#e8b595",
    maxWidth: '100%',
    width: '60%',
    borderRadius: 10,
  },

});
export default GlobalLogin;
