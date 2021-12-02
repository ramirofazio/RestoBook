//----------REACT UTILS-----------
import React, { useEffect, useState } from "react";
//
//
//----------REDUX UTILS-----------
import { useDispatch, useSelector } from "react-redux";
import AddMenu from "../Redux/Actions/AddMenu";
//
//
//----------REACT-NATIVE UTILS-----------
import {
  Button,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
//
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
//
//
//---------SCREENS & COMPONENTS---------------

//
//
//-------STYLES-------
import globalStyles from "./GlobalStyles";
//
//
//-------INITIALIZATIONS-------

//
//---------------------------------------------------------------------------------------//
//
const AddMenuResto = ({ navigation }) => {
  useEffect(() => {});

  const dispatch = useDispatch();
  const empresaDetail = useSelector((state) => state.empresaDetail);
  const menu = useSelector((state) => state.empresaDetail.menu);
  const [spinner, setSpinner] = useState(false);

  const idResto = empresaDetail.idResto;

  const initalState = {
    foodName: "",
    description: "",
    price: "",
    img: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveMenuResto = async () => {
    try {
      let restoRef = doc(firebase.db, "Restos", idResto);
      setSpinner(true);
      await updateDoc(restoRef, {
        menu: arrayUnion(state),
      });
      setSpinner(false);
      navigation.navigate("DetailsResto");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={globalStyles.Home}>
      <View style={globalStyles.inputContainer}>
        <View style={globalStyles.inputComponent}>
          <TextInput
            style={globalStyles.texts}
            placeholder="Food Name"
            onChangeText={(value) => handleChangeText(value, "foodName")}
            value={state.foodName}
          />
        </View>
        <View style={globalStyles.inputComponent}>
          <TextInput
            style={globalStyles.texts}
            placeholder="Description"
            onChangeText={(value) => handleChangeText(value, "description")}
            value={state.description}
          />
        </View>
        <View style={globalStyles.inputComponent}>
          <TextInput
            style={globalStyles.texts}
            placeholder="Price"
            onChangeText={(value) => handleChangeText(value, "price")}
            value={state.price}
          />
        </View>
        <View style={globalStyles.inputComponent}>
          <TextInput
            style={globalStyles.texts}
            placeholder="Image"
            onChangeText={(value) => handleChangeText(value, "img")}
            value={state.img}
          />
        </View>
      </View>
      <View style={globalStyles.container}>
        {/* <Button title="Add Food" onPress={() => saveMenuResto()} /> */}
        <TouchableOpacity
          style={globalStyles.touchLog}
          onPress={() => saveMenuResto()}
        >
          <Text style={globalStyles.fontLog}>Add Food</Text>
        </TouchableOpacity>
      </View>
      {spinner && <Text>Spinner!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddMenuResto;
