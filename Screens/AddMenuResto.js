import React, { useEffect, useState } from "react";
import { Button, View, TextInput, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddMenu from "../Redux/Actions/AddMenu";

import firebase from "../database/firebase";

const AddMenuResto = ({ navigation }) => {


  const dispatch = useDispatch();
  const empresaDetail = useSelector((state) => state.empresaDetail);
  const id = empresaDetail.Id

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
        // await firebase.db.collection("usersMenuResto").add({
        //   foodName: state.foodName,
        //   description: state.description,
        //   price: state.price,

        // });
        navigation.navigate("DetailsResto");
        dispatch(AddMenu(state))

      } catch (error) {
        console.log(error)
      }

    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Food Name"
          onChangeText={(value) => handleChangeText(value, "foodName")}
          value={state.foodName} /
        >
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Description"
          onChangeText={(value) => handleChangeText(value, "description")}
          value={state.description}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Price"
          onChangeText={(value) => handleChangeText(value, "price")}
          value={state.price}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Image"
          onChangeText={(value) => handleChangeText(value, "img")}
          value={state.img}
        />
      </View>
      <View>
        <Button title="Add Food" onPress={() => saveMenuResto()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddMenuResto;