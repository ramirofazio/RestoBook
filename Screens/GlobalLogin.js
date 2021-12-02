//----------REACT UTILS-----------
import React, { useState } from "react";
//
//
//----------REDUX UTILS-----------

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
  Alert, 
 Modal,
} from "react-native";

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
//---------------------------------------------------------------------------------------//
//
const GlobalLogin = ({ navigation }) => {
  const [user, setUser] = useState({
    mail: "",
    password: "",
    secureTextEntry: true,
    iconName: "eye",
  });

  const email = user.mail;
  const pass = user.password;
 
  const handleChangeUser = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const [registered, setRegistered] = useState({
    email:"",
    passwor:"",
    repeatPassword:"",
    phone:"",
    secureTextEntry: true,
  });
  
  const email2 =registered.email;
  const pass2 = registered.passwor;
  const phone = registered.phone;
  const repeatPassword = registered.repeatPassword;

  const handleChangeUser2 = (field, value) => {
    setRegistered({
      ...registered,
      [field]: value,
    });
  };

  // const logUserWithGoogle = async () => {
  //   try {
  //     const newUser = await signInWithRedirect(auth, googleProvider);
  //     if (auth.currentUser) {
  //       console.log("works");
  //       props.navigation.navigate("RestoBook");
  //     } else {
  //       console.log("NO works");
  //     }
  //   } catch (error) {
  //     alert("error!");
  //     console.log(error);
  //   }
  // };

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
      const errorCode = error.code;
      console.log("errorCode", errorCode);
      switch (errorCode) {
        case "auth/wrong-password":
          alert("Wrong password");
          break;
        case "auth/user-not-found":
          alert("User not found");
          break;
        case "auth/internal-error":
          alert("Enter your password!");
          break;
        default:
          alert("Error");
      }
    }
  };

   const saveEmpresa = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email2, pass2, phone, repeatPassword);
      onAuthStateChanged(auth, (usuarioFirebase) => {
        if (usuarioFirebase) {
          sendEmailVerification(auth.currentUser)
            .then(handleChangeUser2("email", ""))
            .then(handleChangeUser2("passwor", ""))
            .then(handleChangeUser2("phone", ""))
            .then(handleChangeUser2("repeatPassword", ""))
            .then(alert("Sign Up!"))
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
          break;
        case "auth/email-already-in-use":
          alert("Email already in-use");
          break;
        default:
          break;
      }
    }
  };
 
  const buttonText = [
    "Log In",
    "Sign Up",
    "I don't have an account yet",
    "I already have an account",
  ];

  const onIconPress = () => {
    let iconName = user.secureTextEntry ? "eye-off" : "eye";
    setUser({
      ...user,
      secureTextEntry: !user.secureTextEntry,
      iconName: iconName,
    });
  };
  
  //---- modal logic xD  ----
  const [modalVisible, setModalVisible] = useState(false);
  // final logica modal 
  
  
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
            onPress={() => logEmpresa()}
          >
            <Text style={globalStyles.fontLog}>Log In</Text>
          </TouchableOpacity>
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.botton, styles.bottonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>Welcome to Restobook</Text>
            <TextInput
              style={globalStyles.texts}
              onPress={onIconPress}
              secureTextEntry={user.secureTextEntry}
              placeholder="Email"
              value={registered.email}
              onChangeText={(value) => handleChangeUser2("email", value)}
            />
             <TextInput
              style={globalStyles.texts}
              onPress={onIconPress}
              secureTextEntry={user.secureTextEntry}
              placeholder="Password"
              value={registered.passwor}
              onChangeText={(value) => handleChangeUser2("passwor", value)}
            />
             <TextInput
              style={globalStyles.texts}
              onPress={onIconPress}
              secureTextEntry={user.secureTextEntry}
              placeholder=" Repeat password"
              value={registered.repeatPassword}
              onChangeText={(value) => handleChangeUser2("repeatpassword", value)}
            />
             <TextInput
              style={globalStyles.texts}
              onPress={onIconPress}
              secureTextEntry={user.secureTextEntry}
              placeholder="phone"
              value={registered.phone}
              onChangeText={(value) => handleChangeUser2("phone", value)}
            />
            
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => saveEmpresa()}
            >
              <Text style={styles.textStyle}>register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
          <TouchableOpacity
            style={globalStyles.touchLog}
            onPress={() => setModalVisible(true)}
          >
            <Text style={globalStyles.fontLog}>Sign Up</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={globalStyles.touchFlag}
            onPress={() =>
              registered ? setRegistered(false) : setRegistered(true)
            }
          >
            <Text style={globalStyles.fontLog}>
              {registered ? buttonText[2] : buttonText[3]}
            </Text>
          </TouchableOpacity> */}

          {/* <Text>O</Text>
          <TouchableOpacity
            style={globalStyles.touchLog}
            onPress={() => logUserWithGoogle()}
          >
            <Text style={globalStyles.fontLog}>Sign In With Google</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

/* const styles = StyleSheet.create({}); */
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "blur",
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
      height: 30
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    fontSize: 30,
    fontWeight: "bold",
  },
  botton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    float: "right",
  },
  bottonClose: {
    backgroundColor: "#2196F3",
  },
  });

export default GlobalLogin;