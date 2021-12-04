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
    <View style={styles.container} >
      <View style={styles.textInput}>
      <Animatable.View animation="zoomIn" duration={1200}>
        <TextInput onSubmitEditing={handleSubmit} style={styles.texto} placeholder="Search..." placeholderTextColor="#0808088f" onChangeText={handleInputChange} value={title} />
      </Animatable.View>
      </View>
      <TouchableOpacity  onPress={handleSubmit}>
      <View style={styles.touchableOpacity}>
        <Feather name="search" style={styles.iconStyle} />
      </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    margin:10,
    backgroundColor: "#F0EEEE",
    height: 35,
    flexDirection: "row",
    marginRight: 16,
    borderRadius: 40,
    marginLeft:16,
  },
  textInput: {
    fontFamily: "Gotham-Book",
    fontSize: 40,
    flex: 1,
    color: "#080808",
    paddingLeft: 3,
    width:'70%',
  },
  texto:{
    padding:10
  },
  iconStyle: {
    fontSize: 20,
    width:20,
    height:20,
  },
  touchableOpacity: {
    marginTop: 4,
    justifyContent:'center',
    width:'20%',
    flexDirection:'row'
  },
});