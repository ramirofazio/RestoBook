//----------REACT UTILS-----------
import React, { useEffect, useState } from "react";
import {GOOGLE_API_KEY} from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//
//
//----------REDUX UTILS-----------
import { useDispatch, useSelector } from "react-redux";
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
import axios from 'axios'
import MapView, { Marker } from "react-native-maps";
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
//
//
//---------SCREENS & COMPONENTS---------------
import addEmpresa from "../Redux/Actions/addEmpresa";
import BtnFuncional from "./Helpers/BtnFuncional.js";
//
//
//-------STYLES-------
import globalStyles from "./GlobalStyles";
//
//
//-------INITIALIZATIONS-------
const auth = getAuth();
//
//---------------------------------------------------------------------------------------//
//

const RegisterResto = (props) => {
  let dispatch = useDispatch();

  const empresas = useSelector((state) => state.empresas);
  const Id = empresas.length + 1;
  //console.log("soy ID", Id)

  const initalState = {
    name: "",
    fantasyName: "",
    cuit: "",
    phone: "",
    phone2: "",
    email: "",
    direccion: '',
    //calle: "",
    //numero: '',
    //ciudad: "",
    //provincia: "",
    // horarios: "",
    Id: Id,
    Title: "",
    Description: "",
    Img: "",
    Lat: -34.6131500,
    Lng: -58.3772300
  };

  const initialRegion = {
    latitude: -34.6131500,
    longitude: -58.3772300,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  
  const [state, setState] = useState(initalState);
  const [region, setRegion] = useState(initialRegion);
  // const loggedId = useSelector((state) => state.currentId);


  // useEffect( async () => {
  //   const {calle, numero, ciudad, provincia} = state;
  //   // if( state.calle !== '' && state.numero !== '' && state.ciudad !== '' && state.provincia !== '' ) {
  //   //   const getLatLong = await axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${calle}+${numero}+${ciudad},${provincia}&key=${GOOGLE_API_KEY}`)
  //   //   console.log(getLatLong.data.results[0].geometry.location)
  //   // const {lat, lng} = getLatLong.data.results[0].geometry.location
      
      
  // }, [state.direccion])

  // const handleCityBlur = (value) => {
  //   setCity(value.target.defaultValue)
  // }

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  // const saveNewResto = () => {
  //   dispatch(addEmpresa(state));
  //   props.navigation.navigate("RestoBook");
  // };
  let id = null;
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      id = usuarioFirebase.uid;
    }
  });

  const saveNewResto = async () => {
    if (state.Title === "") {
      alert("Complete sus datos por favor");
    } else {
      if (id) {
        try {
          firebase.db
            .collection("Restos")
            .doc()
            .set({
              id,
              title: state.Title,
              Description: state.Description,
              Img: state.Img,
              category: '',
              menu: [],
            })
            .then(
              firebase.db
                .collection("Users")
                .doc(id)
                .update({
                  commerce: true
                })
            )
            .then(alert("creado"))
            .then(props.navigation.navigate("RestoBook"));
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("logueate!");
      }
    }
  };

  // const saveNewResto = async () => {
  //   if (state.name === "") {
  //     alert("Complete sus datos por favor");
  //   } else {
  //     try {
  //       await firebase.db.collection("usersResto").add({
  //         name: state.name,
  //         fantasyName: state.fantasyName,
  //         cuit: state.cuit,
  //         phone: state.phone,
  //         phone2: state.phone2,
  //         email: state.email,
  //         provincia: state.provincia,
  //         ciudad: state.ciudad,
  //         direction: state.direction,
  //         horarios: state.horarios,
  //       });

  //       props.navigation.navigate("UsersList");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
          placeholder='Completa tu direccion'
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce= {400}
          enablePoweredByContainer= {false}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
          }}
          minLength={3}
          onPress= {(data, details = null) => {
            const {lat, lng} = details.geometry.location
            setRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.004757,
              longitudeDelta: 0.006866,
            })  
            setState({
              ...state,
              Lat: lat,
              Lng: lng
            })
          }}
          fetchDetails={true}
          styles={{
            container: {
              flex: 0,
              padding: 0,
              marginBottom: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#cccccc",
            },
            textInput: {
              fontSize: 14,
              marginBottom: -10,
              marginLeft: -9,
              backgroundColor: 'transparent',
            }
          }}
        />
      <View style={styles.inputGroup}>
          <TextInput
            placeholder="Razón social"
            onChangeText={(value) => handleChangeText(value, "name")}
            value={state.name}
          />
        </View> 

      <View style={styles.inputGroup}>
          <TextInput
            placeholder="Nombre de fantasía"
            onChangeText={(value) => handleChangeText(value, "fantasyName")}
            value={state.fantasyName}
          />
        </View>

      <View style={styles.inputGroup}>
          <TextInput
            placeholder="Cuit"
            onChangeText={(value) => handleChangeText(value, "cuit")}
            value={state.cuit}
          />
        </View>

      <View style={styles.inputGroup}>
          <TextInput
            placeholder="Teléfono"
            onChangeText={(value) => handleChangeText(value, "phone")}
            value={state.phone}
          />
        </View>

       <View style={styles.inputGroup}>
          <TextInput
            placeholder="Teléfono 2"
            onChangeText={(value) => handleChangeText(value, "phone2")}
            value={state.phone2}
          />
        </View>

      <View style={styles.inputGroup}>
          <TextInput
            placeholder="Email" 
            onChangeText={(value) => handleChangeText(value, "email")} 
            value={state.email} 
          />
        </View>
        
      {/* 
       <View style={styles.inputGroup}>
        <TextInput
          placeholder="Calle"
          onChangeText={(value) => handleChangeText(value, "calle")}
          value={state.calle}
          />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Numero"
          onChangeText={(value) => handleChangeText(value, "numero")}
          value={state.numero}
          />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Provincia"
          onChangeText={(value) => handleChangeText(value, "provincia")}
          value={state.provincia}
        />
      </View>

       <View style={styles.inputGroup}>
        <TextInput
          placeholder="Ciudad"
          onChangeText={(value) => handleChangeText(value, "ciudad")}
          value={state.ciudad}
          onBlur={ value => handleCityBlur(value)}
          />
      </View>  */}
      
      {/* <GooglePlacesInput>
      </GooglePlacesInput> */}
      {/* <View style={styles.inputGroup}>
        <TextInput
          placeholder="Horarios"
          onChangeText={(value) => handleChangeText(value, "horarios")}
          value={state.horarios}
        />
      </View> */}
      {/* <View style={styles.inputGroup}>
        <TextInput
          placeholder="Title"
          onChangeText={(value) => handleChangeText(value, "Title")}
          value={state.Title}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Descripcion"
          onChangeText={(value) => handleChangeText(value, "Description")}
          value={state.Description}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Image"
          onChangeText={(value) => handleChangeText(value, "Img")}
          value={state.Img}
        />
      </View> */}
      
      <View style={styles.googleMapsContainer}>
        <MapView
          style={styles.googleMaps}
          region={region}
        >
        <Marker
          title='Your Resto'
          coordinate={region}
        >
        </Marker>
        </MapView>  
      </View>

      <View>
        <Button title="Crear" onPress={() => saveNewResto()} />
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#FFF',
    height: 50,
    marginVertical: 5
  },
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
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
  googleMapsContainer: {
    padding: 5,
    flex: 1
  },
  googleMaps: {
      borderColor: 'skyblue',
      borderWidth: 1,
      height: 300,
      borderRadius: 150
  }
});

export default RegisterResto;
