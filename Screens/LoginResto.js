import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import firebase from "../database/firebase";
import fireAuth from "../database/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const auth = getAuth();

const LoginResto = ({ navigation }) => {
  const [pass, setPass] = useState({
    password: "",
    secureTextEntry: true,
    iconName: "eye",
  });

  const [mail, setMail] = useState({
    mail: "",
  });

  const handleChangeMail = (value) => {
    setMail({
      mail: value,
    });
  };

  const handleChangePass = (value) => {
    setPass({
      ...pass,
      password: value,
    });
  };

  const [registered, setRegistered] = useState(true);

  const logEmpresa = async () => {
    const mockEmail = "henryrestobook@gmail.com";
    const mockPassword = "123456";
    try {
      const newUser = await firebase.fireAuth.signInWithEmailAndPassword(
        mockEmail,
        mockPassword
      );
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
    const mockEmail = "henryrestobook@gmail.com";
    const mockPassword = "123456";

    try {
      firebase.fireAuth
        .createUserWithEmailAndPassword(mockEmail, mockPassword)
        .then(firebase.fireAuth.currentUser.sendEmailVerification())
        .then(alert("sucess"))
        .then(navigation.navigate("AwaitEmail"));
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
    let iconName = pass.secureTextEntry ? "eye-off" : "eye";
    setUsers({
      secureTextEntry: !pass.secureTextEntry,
      iconName: iconName,
    });
  };

  return (
    <View>
      <ScrollView>
        <View>
          <TextInput
            placeholder="Email"
            onChangeText={(value) => handleChangeMail(value)}
          />
        </View>
        <View>
          <TextInput
            onPress={onIconPress}
            secureTextEntry={pass.secureTextEntry}
            placeholder="Password"
            onChange={(value) => handleChangePass(value)}
          />
          <TouchableOpacity onPress={onIconPress}>
            <Icon name={pass.iconName} size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <Button
            title={registered ? buttonText[0] : buttonText[1]}
            onPress={() => (registered ? logEmpresa() : saveEmpresa())}
          />
        </View>

        <View>
          <Button
            title={registered ? buttonText[2] : buttonText[3]}
            onPress={() =>
              registered ? setRegistered(false) : setRegistered(true)
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginResto;
