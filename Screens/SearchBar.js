// import React, { useState } from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import { ScrollView, Image, Animated, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import addEmpresa from "../Redux/Actions/addEmpresa.js";

import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { ScrollView, Image, Animated, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { useDispatch } from "react-redux";
// import { getEventsByName, getEvents } from "../../redux/actions";
import * as Animatable from "react-native-animatable";


export default function SearchBar({resto}) {
    const [navOpen, setNavOpen] = useState(false)
    const[name, setName] = useState('')
    
    function handleInputChange(e){
        setName(e.target)
        // dispatch()
        console.log(e)
    }
        function handleSubmit(e){
            // if (title === "todos") {
            //     dispatch(getEvents());
            //   } else if (title === "") {
            //     setDisplay(false);
            //   } else {
            //     dispatch(getEventsByName(title));
            //   }
            //   //console.log("el boton", title);
            //   setTitle("");
            // }  
        }
    return(
        <View style={styles.container}>
        <Animatable.View animation="zoomIn" duration={1200}>
          <TextInput onSubmitEditing={handleSubmit} style={styles.textInput} placeholder="Search..." placeholderTextColor="#0808088f" onChangeText={handleInputChange} value={title} />
        </Animatable.View>
        <TouchableOpacity style={styles.touchableOpacity} onPress={handleSubmit}>
          <Feather name="search" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    )
}


    // const styles = StyleSheet.create({
    //     // searchbar:{
    //         //     borderRadius: 5,
    //         //     width:200,
    //         //      height: 20,
    //         //      borderWidth:1,
    //         //      borderColor: 'black',
    //         //      marginBottom: 10,
    //         //      marginHorizontal: 10
    //         //     }
    //         searchSection: {
    //             flex: 1,
    //             alignSelf: 'center',
    //             justifyContent: 'center',
    //             width:"90%",
    //             flexDirection: 'row',
    //             justifyContent: 'center',
    //             marginTop:10,
    //             height:25
    //         },
    //         img:{
    //             margin:8,
    //             height:10,
    //             width:10,
    //             alignItems:'center'
    //         },
    //         searchIcon: {
    //             height:26,
    //             marginLeft:10,
    //             borderRadius: 10,
    //             backgroundColor: '#ffd964',
    //             alignItems: "center",
    //             borderWidth: 1,
    //             borderColor: '#b39138',
                
    //         },
    //         input: {
    //         textAlign:'center',
    //         alignItems: 'center',
    //         flex: 1,
    //         paddingTop: 2,
    //         paddingRight: 2,
    //         paddingBottom: 1,
    //         paddingLeft: 0,
    //         backgroundColor: 'white',
    //         borderRadius:5
    //     },
    // });
    const styles = StyleSheet.create({
        // searchbar:{
            //     borderRadius: 5,
            //     width:200,
            //      height: 20,
            //      borderWidth:1,
            //      borderColor: 'black',
            //      marginBottom: 10,
            //      marginHorizontal: 10
            //     }
            searchSection: {
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                width:"90%",
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop:10,
                height:25
            },
            img:{
                margin:8,
                height:10,
                width:10,
                alignItems:'center'
            },
            searchIcon: {
                height:26,
                marginLeft:10,
                borderRadius: 10,
                backgroundColor: '#ffd964',
                alignItems: "center",
                borderWidth: 1,
                borderColor: '#b39138',
                
            },
            input: {
            textAlign:'center',
            alignItems: 'center',
            flex: 1,
            paddingTop: 2,
            paddingRight: 2,
            paddingBottom: 1,
            paddingLeft: 0,
            backgroundColor: 'white',
            borderRadius:5
        },
    });