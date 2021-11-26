import React, { useState } from "react";
import { Button, View, TextInput, ScrollView, StyleSheet } from "react-native";

import firebase from "../database/firebase";

const AddMenuRestoScreen = (props) => {
  const initalState = {
    foodName: "",
    description: "",
    price: "",

  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveMenuResto = async () => {
    if (state.foodName === "") {
      alert("Complete sus datos por favor");
    } else {

      try {
        await firebase.db.collection("usersMenuResto").add({
          foodName: state.foodName,
          description: state.description,
          price: state.price,

        });

        props.navigation.navigate("UsersMenuList");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Nombre de comida" onChangeText={(value) => handleChangeText(value, "foodName")} value={state.foodName} />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Descripcion" onChangeText={(value) => handleChangeText(value, "description")} value={state.description} />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Precio" onChangeText={(value) => handleChangeText(value, "price")} value={state.price} />
      </View>
      <View>
        <Button title="Agregar" onPress={() => saveMenuResto()} />
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

export default AddMenuRestoScreen;