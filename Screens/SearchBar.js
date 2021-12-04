import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

export default function Search({ }) {
  const [title, setTitle] = useState("");
  //console.log("soy el title", title);

  function handleInputChange(text) {
    setTitle(text);
    //console.log('soy el input', title);
  }

  function handleSubmit() {
    //console.log("el boton", title);
    setTitle("");
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="zoomIn" duration={1200}>
        <TextInput onSubmitEditing={handleSubmit} style={styles.textInput} placeholder="Buscar por título..." placeholderTextColor="#0808088f" onChangeText={handleInputChange} value={title} />
      </Animatable.View>
      <TouchableOpacity style={styles.touchableOpacity} onPress={handleSubmit}>
        <Feather name="search" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#F0EEEE",
    height: 35,
    flexDirection: "row",
    marginTop: 2,
    marginRight: 16,
    borderRadius: 40,
  },
  textInput: {
    width:  2.5,
    marginLeft: 10,
    fontFamily: "Gotham-Book",
    fontSize: 15,
    flex: 1,
    color: "#080808",
    paddingLeft: 3,
  },
  iconStyle: {
    fontSize: 27,
    alignSelf: "center",
    marginRight: 6,
    marginTop: -1,
  },
  touchableOpacity: {
    marginTop: 4,
  },
});