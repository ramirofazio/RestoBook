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
// import firebase from "../database/firebase";
// import fireAuth from "../database/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
// import { useScrollToTop } from "@react-navigation/native";

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
        props.navigation.navigate("Home");
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
        alert("verified");
        navigation.navigate("Home");
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
    "Ingresar",
    "Registrate",
    "Aun no tengo cuenta",
    "Ya tengo cuenta",
  ];

  const onIconPress = () => {
    let iconName = user.secureTextEntry ? "eye-off" : "eye";
    setUser({
      secureTextEntry: !user.secureTextEntry,
      iconName: iconName,
    });
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.inputContainer}>
          <View style={styles.inputComponent}>
            <TextInput
              placeholder="Email"
              value={user.mail}
              onChangeText={(value) => handleChangeUser("mail", value)}
            />
          </View>
          <View style={styles.inputComponent}>
            <TextInput
              onPress={onIconPress}
              secureTextEntry={user.secureTextEntry}
              placeholder="Password"
              value={user.password}
              onChangeText={(value) => handleChangeUser("password", value)}
            />
            <TouchableOpacity
              onPress={onIconPress}
              style={styles.inputComponent}
            >
              <Icon name={user.iconName} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.touchLog}
            onPress={() => (registered ? logEmpresa() : saveEmpresa())}
          >
            <Text style={styles.fontLog}>
              {registered ? buttonText[0] : buttonText[1]}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchFlag}
            onPress={() =>
              registered ? setRegistered(false) : setRegistered(true)
            }
          >
            <Text style={styles.fontFlag}>
              {registered ? buttonText[2] : buttonText[3]}
            </Text>
          </TouchableOpacity>

          <Text>O</Text>

          <TouchableOpacity
            style={styles.touchLog}
            onPress={() => logUserWithGoogle()}
          >
            <Text style={styles.fontLog}>Ingresa con Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  inputComponent: {
    marginTop: 15,
    backgroundColor: "#cacbcf",
    width: 300,
    borderRadius: 5,
  },

  touchLog: {
    marginTop: 10,
    width: 200,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    color: "#9b9ba3",
    backgroundColor: "#4951de",
    padding: 10,
  },
  touchFlag: {
    marginTop: 10,
    width: 200,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#cacbcf",
    padding: 10,
  },
  fontLog: {
    color: "#cacbcf",
  },
  fontFlag: {
    color: "#4951de",
  },
});
export default GlobalLogin;
