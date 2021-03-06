//----------REACT UTILS-----------
import React, { useState } from "react";
//
//
//----------REDUX UTILS-----------
//
//
//----------REACT-NATIVE UTILS-----------
import { View, TextInput, ScrollView, TouchableOpacity } from "react-native";
//
//
//----------FIREBASE UTILS-----------
//
//
//---------SCREENS & COMPONENTS---------------
import Btn from "./Helpers/Btns.js";
//
//
//-------ICONS-------
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
//
//
//-------STYLES-------
//
//
//-------INITIALIZATIONS-------
//
//---------------------------------------------------------------------------------------//
//
const AddUserScreen = ({ navigation }) => {


  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    secureTextEntry: true,
    iconName: "eye",
  });
  const handleChangeText = (name, value) => {
    setUsers({
      ...users,
      [name]: value,
    });
  };
  const onIconPress = () => {
    let iconName = users.secureTextEntry ? "eye-off" : "eye";
    setUsers({
      secureTextEntry: !users.secureTextEntry,
      iconName: iconName,
    });
  };
  return (
    <View>
      <ScrollView>
        <View>
          <Btn
            nombre="Soy una Empresa"
            ruta="Register Resto"
            navigation={navigation}
          />
        </View>
        <View>
          <TextInput
            placeholder="Name"
            onChange={(value) => handleChangeText("name", value)}
          />
        </View>
        <View>
          <TextInput
            placeholder="Email"
            onChange={(value) => handleChangeText("name", value)}
          />
        </View>
        <View>
          <TextInput
            onPress={onIconPress}
            secureTextEntry={users.secureTextEntry}
            placeholder="Password"
            onChange={(value) => handleChangeText("name", value)}
          />
          <TouchableOpacity onPress={onIconPress}>
            <Icon name={users.iconName} size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddUserScreen;
