//----------REACT UTILS-----------
import React, { useState } from "react";
//
//
//----------REDUX UTILS-----------
import { useSelector } from "react-redux";
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
//----------GOOGLE MAPS---------------
import MapView, { Marker } from "react-native-maps";
import { GOOGLE_API_KEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
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
const auth = getAuth();
//
//---------------------------------------------------------------------------------------//
//

const RegisterResto = (props) => {

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

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  let id = null;
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      id = usuarioFirebase.uid;
    }
  });

  const saveNewResto = () => {
    //alert("Complete sus datos por favor");
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

  };


  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Completa tu direccion'
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400}
        enablePoweredByContainer={false}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        minLength={3}
        onPress={(data, details = null) => {
          const { lat, lng } = details.geometry.location
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
      <View style={styles.inputGroup}>
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
