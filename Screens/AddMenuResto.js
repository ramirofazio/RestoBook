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
  const dispatch = useDispatch();
  const empresaDetail = useSelector((state) => state.empresaDetail);
  const id = empresaDetail.Id;

  const initalState = {
    foodName: "",
    description: "",
    price: "",
    img: "",
    id,
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveMenuResto = async () => {
    if (state.foodName === "") alert("El nombre del producto es obligatorio");
    if (state.description === "") alert("Complete sus datos por favor");
    if (state.price === "") alert("Complete sus datos por favor");
    else {
      try {
        const menuRef = await addDoc(collection(db, "menuResto"), {
          foodName: state.foodName,
          description: state.description,
          price: state.price,
          img: state.img,
          id: state.id,
        });
        navigation.navigate("DetailsResto");
        dispatch(AddMenu(state));
      } catch (error) {
        console.log(error);
      }
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
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddMenuResto;
