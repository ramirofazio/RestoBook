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
  StyleSheet,
  ScrollView
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
import { BottomSheet, ListItem } from "react-native-elements";

//
//-------INITIALIZATIONS-------
const auth = getAuth();
//
//---------------------------------------------------------------------------------------//
//

const RegisterResto = (props) => {

  const categories = useSelector((state) => state.categoriesResto);

  const initalState = {
    razonSocial: "",
    fantasyName: "",
    cuit: "",
    phone: "",
    phone2: "",
    email: "",
    address: '',
    title: "",
    description: "",
    img: "",
    category: "",
    lat: -34.6131500,
    lng: -58.3772300,
  };

  const initialRegion = {
    latitude: -34.6131500,
    longitude: -58.3772300,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const [isVisible, setIsVisible] = useState(false)
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

  const setStateAndRegion = (newLocation, formatedAddress) => {
      const {lat, lng} = newLocation;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.004757,
        longitudeDelta: 0.006866,
      })
      setState({
        ...state,
        address: formatedAddress,
        lat: lat,
        lng: lng
      })
  }
  const saveNewResto = () => {
    //alert("Complete sus datos por favor");
    if (id) {
      try {
        firebase.db
          .collection("Restos")
          .doc()
          .set({
            idUser: id,
            title: state.fantasyName,
            description: state.description,
            img: state.img,
            category: state.category,
            menu: [],
            phone: state.phone,
            phone2: state.phone2,
            email: state.email,
            cuit: state.cuit,
            razonSocial: state.razonSocial,
            location : { 
              latitude: state.lat, 
              longitude: state.lng, 
              address: state.address 
            }
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
    <View style={{flex: 1.4}}>
      <ScrollView>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Razón social"
            onChangeText={(value) => handleChangeText(value, "razonSocial")}
            value={state.razonSocial}
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
            placeholder="Descripcion"
            onChangeText={(value) => handleChangeText(value, "description")}
            value={state.description}
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
            placeholder="Imagen Principal"
            onChangeText={(value) => handleChangeText(value, "img")}
            value={state.img}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            editable={false}
            placeholder="Select Category"
            value={state.category}
            onPressIn={() => setIsVisible(true)}
          />
        </View>
        <BottomSheet
          isVisible={isVisible}
          containerStyle={{backgroundColor: 'rgba(0.5,0.25,0,0.2)'}}
        >
          {categories.map((categoria, index) => (
            <ListItem 
              key={index} 
              containerStyle={{backgroundColor: 'rgba(0.5,0.25,0,0.7)'}} 
              style={{borderWidth: 1, borderColor: '#cccccc'}} 
              onPress={() => {
                setState({
                  ...state,
                  category: categoria
                })
                setIsVisible(false)
              }}
            >
              <ListItem.Content>
                <ListItem.Title style={{height: 35, color: '#FFF', padding: 8}}>{categoria}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
            <ListItem key={999}  containerStyle={{backgroundColor: 'red'}} style={{borderWidth: 1, borderColor: '#cccccc'}} onPress={() => setIsVisible(false)}>
              <ListItem.Content style={{}}>
                <ListItem.Title style={{height: 35, color: '#FFF', padding: 8 }}>Cancel</ListItem.Title>
              </ListItem.Content>
            </ListItem>
        </BottomSheet>  
      </ScrollView>
      </View>


      <View style={{flex: 3}}>
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
          onPress={(data, details = null) => setStateAndRegion(details.geometry.location, details.formatted_address)}
          fetchDetails={true}
          styles={{
            container: {
              marginTop: 5,
              flex: 1,
              padding: 0,
              borderTopWidth: 1,
              borderTopColor: "skyblue",
            },
            textInput: {
              fontSize: 15,
              marginLeft: -9,
              backgroundColor: 'transparent',
            }
          }}
        />
        <View style={styles.googleMapsContainer}>
          <MapView
            style={styles.googleMaps}
            region={region}
          >
            <Marker
              draggable
              title='Your Resto'
              coordinate={region}
              onDragEnd={ event => {
                const {latitude, longitude} = event.nativeEvent.coordinate
                const newLocation = {
                  lat: latitude,
                  lng: longitude
                }
                setStateAndRegion(newLocation)
              }}
              pinColor='#0072B5'
            >
            </Marker>
          </MapView>
        </View>

        <View>
          <Button title="Crear" onPress={() => saveNewResto()} />
        </View>

      </View>      
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  inputGroup: {
    height: 50,
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
    flex: 2
  },
  googleMaps: {
    borderColor: '#034F84',
    borderWidth: 1,
    flex: 1,
    borderRadius: 10
  }
});

export default RegisterResto;
