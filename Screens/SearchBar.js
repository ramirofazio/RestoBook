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
      <View style={styles.touchableOpacity}>
        <Feather name="search" style={styles.iconStyle} />
      </View>
      <TouchableOpacity  onPress={handleSubmit}>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginVertical:10,
    backgroundColor: "#F0EEEE",
    height: 35,
    flexDirection: "row",
    width: '90%',
    borderRadius: 40,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.84,
    elevation: 7
  },
  textInput: {
    fontFamily: "Gotham-Book",
    // color: "#ECCDAA",
    fontSize: 40,
    flex: 1,
    paddingLeft: 3,
    width:'70%',
  },
  texto:{
    paddingHorizontal:15,
    marginVertical:5,
    textAlign: 'left',
    justifyContent: "center"
  },
  iconStyle: {
    fontSize: 20,
    width:20,
    height:20,
    color: '#ECCDAA'
  },
  touchableOpacity: {
    justifyContent:'center',
    alignItems:'center',
    width:'15%',
    height: '100%',
    borderRadius: 40, 
    backgroundColor: '#161616',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.84,
    elevation: 5
  },
});