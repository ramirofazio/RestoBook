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
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
//
//----------FORMIK y YUP------------------
import { Formik } from 'formik';
import * as yup from 'yup';

//
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
//------IMAGINE PICKER---------
import * as ImagePicker from "expo-image-picker";

//
//
//-------INITIALIZATIONS-------
const auth = getAuth();
//
//---------------------------------------------------------------------------------------//
//

const registerRestoSchema = yup.object({
  email: yup.string()
    .email()
    .required(),
  title: yup.string()
    .required()
    .min(3)
    .max(15),
  description: yup.string()
    .required()
    .min(10)
    .max(60),
  phone: yup.number()
    .required(),
  phone2: yup.number(),
  cuit: yup.number()
    .required(),
})

const RegisterResto = ({ navigation }) => {

  const initialRegion = {
    latitude: -34.6131500,
    longitude: -58.3772300,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  const [isVisible, setIsVisible] = useState(false)
  const [region, setRegion] = useState(initialRegion);
  const [state, setState] = useState({
    lat: -34.6131500,
    lng: -58.3772300,
    address: "",
    category: '',
  })
  const categories = useSelector((state) => state.categoriesResto);

  let id = null;
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      id = usuarioFirebase.uid;
    }
  });

  const handleOnPressPickImage = async (handleChange) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        handleChange(result.uri);
      }
    } else {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  const setStateAndRegion = (newLocation, formatedAddress) => {
    const { lat, lng } = newLocation;
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

  return (
    <ScrollView>
      <View style={globalStyles.Home}>
        <Formik
          initialValues={{
            email: "",
            razonSocial: "",
            title: "",
            description: "",
            phone: "",
            phone2: "",
            cuit: "",
            category: state.category,
            img: "",
            lat: state.lat,
            lng: state.lng,
            address: state.address,
          }}
          validationSchema={registerRestoSchema}
          onSubmit={(values) => {
            if (id) {
              try {
                firebase.db
                  .collection("Restos")
                  .doc()
                  .set({
                    idUser: id,
                    email: values.email,
                    razonSocial: values.razonSocial,
                    title: values.title,
                    description: values.description,
                    phone: values.phone,
                    phone2: values.phone2,
                    cuit: values.cuit,
                    category: values.category,
                    img: values.img,
                    menu: [],
                    location: {
                      latitude: values.lat,
                      longitude: values.lng,
                      address: values.address
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
                  .then(navigation.navigate("RestoBook"))
              } catch (error) {
                console.log(error);
              }
            } else {
              alert("logueate!");
            }
          }}
        >
          {(props) => (
            <View>
              <ScrollView>

                <View style={globalStyles.inputComponent}>
                  <TextInput
                    style={globalStyles.texts}
                    placeholder="Email"
                    onChangeText={props.handleChange("email")}
                    value={props.values.email}
                    onBlur={props.handleBlur("email")}
                  />
                </View>

                {props.touched.email && props.errors.email ? (
                  <Text style={globalStyles.errorText}>{props.errors.email}</Text>
                ) : null}

                <View style={globalStyles.inputComponent}>
                  <TextInput
                    style={globalStyles.texts}
                    placeholder="Title"
                    onChangeText={props.handleChange("title")}
                    value={props.values.title}
                    onBlur={props.handleBlur("title")}
                  />
                </View>

                {props.touched.title && props.errors.title ? (
                  <Text style={globalStyles.errorText}>{props.errors.title}</Text>
                ) : null}

                <View style={globalStyles.inputComponent}>
                  <TextInput
                    style={globalStyles.texts}
                    placeholder="Description"
                    onChangeText={props.handleChange("description")}
                    value={props.values.description}
                    onBlur={props.handleBlur("description")}
                  />
                </View>

                {props.touched.description && props.errors.description ? (
                  <Text style={globalStyles.errorText}>{props.errors.description}</Text>
                ) : null}

                <View style={globalStyles.inputComponent}>
                  <TextInput
                    style={globalStyles.texts}
                    placeholder="Phone"
                    onChangeText={props.handleChange("phone")}
                    value={props.values.phone}
                    onBlur={props.handleBlur("phone")}
                  />
                </View>

                {props.touched.phone && props.errors.phone ? (
                  <Text style={globalStyles.errorText}>{props.errors.phone}</Text>
                ) : null}

                <View style={globalStyles.inputComponent}>
                  <TextInput
                    style={globalStyles.texts}
                    placeholder="Phone 2"
                    onChangeText={props.handleChange("phone2")}
                    value={props.values.phone2}
                    onBlur={props.handleBlur("phone2")}
                  />
                </View>

                {props.touched.phone2 && props.errors.phone2 ? (
                  <Text style={globalStyles.errorText}>{props.errors.phone2}</Text>
                ) : null}

                <View style={globalStyles.inputComponent}>
                  <TextInput
                    style={globalStyles.texts}
                    placeholder="Cuit"
                    onChangeText={props.handleChange("cuit")}
                    value={props.values.cuit}
                    onBlur={props.handleBlur("cuit")}
                  />
                </View>

                {props.touched.cuit && props.errors.cuit ? (
                  <Text style={globalStyles.errorText}>{props.errors.cuit}</Text>
                ) : null}

                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={globalStyles.touchLog}
                    onPress={() => {
                      handleOnPressPickImage(props.handleChange("img"));
                    }}
                  >
                    <Text style={globalStyles.fontLog}>
                      {props.values.img && props.values.img.length > 0
                        ? "Change Image"
                        : "Select Image"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={globalStyles.touchLog}
                    onPress={() => props.handleSubmit()}
                  >
                    <Text style={globalStyles.fontLog}>Create</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

            </View>

          )}
        </Formik>

        <View style={globalStyles.inputComponent}>
          <TextInput
            style={globalStyles.texts}
            editable={false}
            placeholder="Select Category"
            value={state.category}
            onPressIn={() => setIsVisible(true)}
          />
          <BottomSheet
            isVisible={isVisible}
            containerStyle={{ backgroundColor: 'rgba(0.5,0.25,0,0.2)' }}
          >
            {categories.map((categoria, index) => (
              <ListItem
                key={index}
                containerStyle={{ backgroundColor: 'rgba(0.5,0.25,0,0.7)' }}
                style={{ borderWidth: 1, borderColor: '#cccccc' }}
                onPress={(e) => setState({ ...state, category: categoria }) && setIsVisible(false)}
              >
                <ListItem.Content>
                  <ListItem.Title style={{ height: 35, color: '#FFF', padding: 8 }}>{categoria}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
            <ListItem key={999} containerStyle={{ backgroundColor: 'red' }} style={{ borderWidth: 1, borderColor: '#cccccc' }} onPress={() => setIsVisible(false)}>
              <ListItem.Content style={{}}>
                <ListItem.Title style={{ height: 35, color: '#FFF', padding: 8 }}>Cancel</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </BottomSheet>
        </View>


        <View style={{ flex: 3 }}>
          <View style={globalStyles.inputComponent}>
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
          </View>

          <View style={styles.googleMapsContainer}>
            <MapView
              style={styles.googleMaps}
              region={region}
            >

              <Marker
                draggable
                title='Your Resto'
                coordinate={region}
                onDragEnd={event => {
                  const { latitude, longitude } = event.nativeEvent.coordinate
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
        </View>
      </View >
    </ScrollView>

  )
}

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
    flex: 2,
  },
  googleMaps: {
    borderColor: '#034F84',
    borderWidth: 1,
    flex: 1,
    borderRadius: 10
  }
});
export default RegisterResto;
