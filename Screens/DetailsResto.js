//----------REACT UTILS-----------
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
//
//
//----------REDUX UTILS-----------
import { useSelector } from "react-redux";
//
//
//----------REACT-NATIVE UTILS-----------
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, Modal, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//---------------------GEOLOCATION-------------------
import { GOOGLE_API_KEY } from "@env";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
//----------------------------------------------------
//import DateTimePicker from '@react-native-community/datetimepicker';
//
//
//----------FIREBASE UTILS-----------
import { getAuth } from "firebase/auth";
import { onSnapshot, collection, query, doc, getDoc } from "firebase/firestore";

import firebase from "../database/firebase";
import { MaterialIcons } from "@expo/vector-icons";
//
//
//---------SCREENS & COMPONENTS---------------
import CardMenu from "../components/CardMenu";
import ListReviews from "./ListReviews"
import AddReviewsRestorant from "./AddReviewsRestorant";
//
//
//-------STYLES-------
import globalStyles from "./GlobalStyles";
//
//
//----------CONSTANTES--------------
const ENTRADAS = "ENTRADAS"
const PLATO_PRINCIPAL = "PLATO PRINCIPAL"
const GUARNICION = 'GUARNICION'
const BEBIDA = "BEBIDA"
const POSTRES = "POSTRES"
//
//
//-------INITIALIZATIONS-------
const auth = getAuth();
//
//---------------------------------------------------------------------------------------//
//
const DetailsResto = ({ navigation }) => {
  //--------------------------REVIEWS-------------------------------
  const [reviews, setReviews] = useState()

  //--------------------------MERCADO PAGO--------------------------
  const [precioCabeza, setPrecioCabeza] = useState()
  const [cantLugares, setCantLugares] = useState()
  const [modalVisible, setModalVisible] = useState(false)

  //--------------------------FILTROS CATEGORY--------------------------
  const [menuCategory, setMenuCategory] = useState()
  const empresaDetail = useSelector((state) => state.empresaDetail);
  //--------------------GEOLOCATION-------------------------------
  const { location } = empresaDetail
  const userLocation = useSelector(state => state.userCoordinates)
  const mapRef = useRef(null)
  //--------------------------------------------------------------
  const number = "+541168020511"
  //WhatsApp
  const handleWhatsAppPress = async () => {
    await Linking.openURL(`whatsapp://send?text=Hola RestoBook&phone=${number}`)
}
  const [menuArr, setMenuArr] = useState([]);
  const onPressReservar = async (cantLugares, precioCabeza) => {
    const url = await axios(
      {
        method: 'POST',
        url: 'http://192.168.0.10:19006/checkout',
        data: {
          restoName: empresaDetail.title,
          quantity: cantLugares,
          unit_price: precioCabeza
        }
      }
    )
    setModalVisible(false)
    navigation.navigate("WebViewScreen", {
      url: url.data
    })
  }
  
  useEffect(() => {
    if (!userLocation || !location) return 
    //Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(['userLocation', 'restoLocation'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
    })
  }, [])
  const getMenu = () => {
    const q = query(collection(firebase.db, "Restos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let menu = [];
      querySnapshot.forEach((doc) => {
        if (doc.id === empresaDetail.idResto) {
          //console.log("yes!");
          let obj = doc.data();
          menu = obj.menu;
          setMenuArr(menu);
        }
      });
    });
    setMenuCategory('')
  }
  useEffect(() => {
    getMenu()
  }, []);
  const handleCategory = async (category) => {
    const docRef = doc(firebase.db, "Restos", empresaDetail.idResto);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const menuResto = docSnap.data().menu;
      //console.log(menuResto)
      const result = menuResto.filter((menu) => menu.category === category.toLowerCase())

      //console.log(result)
      if (result.length === 0) {
        alert("No hay comidas con esta categoria")
        getMenu()
      } else {
        setMenuCategory(result)
      }
    }
  }

  useEffect(() => {
    const q = doc(firebase.db, "Restos", empresaDetail.idResto);
    const unsubscribe = onSnapshot(q, (doc) => {
      setReviews(doc.data().reviews)
    });
  }, []);
  
  return (
    <ScrollView style={globalStyles.Home}>
      <View style={{ backgroundColor: "#333a" }}>
        <Text style={{ textAlign: "center", fontSize: 30, marginVertical: 10, color: "#fff" }}>{empresaDetail.title}</Text>
      </View>
    
      <View>
        <View style={globalStyles.btnTodasComidas}>
          <TouchableOpacity onPress={() => getMenu()} >
            <Text style={{
              fontWeight: "bold",
              fontSize: 15,
              padding: 1,
              alignSelf: "center",
            }}>Todas Las Comidas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoriesContainer}>
          <View style={globalStyles.categoriesViewDetail}>
            <TouchableOpacity
              onPress={() => handleCategory(ENTRADAS)}
            >
              <Text style={globalStyles.categoriesText}>Entradas</Text>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.categoriesViewDetail}>
            <TouchableOpacity
              onPress={() => handleCategory(PLATO_PRINCIPAL)}
            >
              <Text style={globalStyles.categoriesText}>Plato Principal</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.categoriesViewDetail}>
            <TouchableOpacity
              onPress={() => handleCategory(GUARNICION)}
            >
              <Text style={globalStyles.categoriesText}>Guarnicion</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.categoriesViewDetail}>
            <TouchableOpacity
              onPress={() => handleCategory(BEBIDA)}
            >
              <Text style={globalStyles.categoriesText}>Bebidas</Text>
            </TouchableOpacity>
          </View>


          <View style={globalStyles.categoriesViewDetail}>
            <TouchableOpacity
              onPress={() => handleCategory(POSTRES)}
            >
              <Text style={globalStyles.categoriesText}>Postres</Text>
            </TouchableOpacity>
          </View>



        </View>
        {menuArr.length > 0 ? 
          <ScrollView style={styles.showMenu}>
            {menuCategory ? menuCategory.map((menu, index) => {
              return (
                <CardMenu key={index} menu={menu}>
                  {" "}
                </CardMenu>
              );
            }) :
              menuArr.map((menu, index) => {
                return (
                  <CardMenu key={index} menu={menu}>
                    {" "}
                  </CardMenu>
                );
              })}
          </ScrollView>
         : (
          <Text
            style={{ alignSelf: "center", fontSize: 30, marginVertical: 30 }}
          >
            {" "}
            Add a food to see it!
          </Text>
        )}
        <View onTouchStart={() => setModalVisible(!modalVisible)}>
          <TouchableOpacity style={globalStyles.btnFiltrosHome} >
            <Text style={globalStyles.btnTextFiltro}><MaterialIcons name="payment" size={20} color="#161616" ></MaterialIcons> Quiero Reservar !
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.googleMapsContainer}>
          <MapView
            ref={mapRef}
            style={styles.googleMaps}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.004757,
              longitudeDelta: 0.006866,
            }}
          >
            <Marker
              title="Resto Location"
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              pinColor='#0072B5'
              identifier="restoLocation"
            />
            <Marker
              title="Your location"
              coordinate={userLocation}
              pinColor="#0072B5"
              identifier="userLocation"
           />
           { userLocation && location && (
            <MapViewDirections
              apikey={GOOGLE_API_KEY}
              strokeWidth={1.5}
              strokeColor="gray"
              origin={userLocation}
              destination={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
            />
          )}
          </MapView>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={globalStyles.centeredView}>
          <View style={globalStyles.modalView}>
            <TouchableOpacity
              style={globalStyles.btnTodasComidas}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text 
              style={globalStyles.texts}
                onPress={() => setModalVisible(false)}
                > X </Text>
            </TouchableOpacity>
            <Text style={globalStyles.texts}>Selecciona la cantidad de lugares</Text>
            <TextInput placeholder='Cantidad de lugares' style={globalStyles.inputComponent} keyboardType='numeric' onChangeText={(value) => setCantLugares(parseInt(value))}>
            </TextInput>
            <Text style={globalStyles.texts}>Precio por cabeza otorgado por Empresa seria:</Text>
            <TextInput placeholder='Cantidad de lugares' style={globalStyles.inputComponent} keyboardType='numeric' onChangeText={(value) => setPrecioCabeza(parseInt(value))}>
            </TextInput>
            <Text style={globalStyles.modalText}>Precio por persona ${precioCabeza}</Text>
            <TouchableOpacity
              style={globalStyles.btnLogin}
              onPress={() => onPressReservar(cantLugares, precioCabeza)}
            >
              <Text style={globalStyles.texts}>Reservar mi lugar por ${cantLugares * precioCabeza}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.listReviews}>
                  <ListReviews navigation={navigation} reviews={reviews}/>
                </View>
      <View>
      </View>
    </ScrollView>

  );
};
const styles = StyleSheet.create({
  listReviews:{
    
  },
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  titleContainer: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "skyblue",
  },
  title: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 30,
    color: "#333",
    letterSpacing: 1,
  },

  categoriesContainer: {
    height: 33,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 20,
    margin: 5,
  },
  showMenu: {
    height: 250,
    padding: 10,
    borderWidth: 0,
  },
  googleMapsContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 50,
  },
  googleMaps: {
    height: 250,
    borderRadius: 100,
  },
  wppIcon:{
    height:30,
    marginLeft:10,
    borderRadius: 10,
    width: 40,
    backgroundColor: '#ffd964',
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#b39138',
    
  },
  img:{
    margin: 5,
    height:20,
    width:20,
    alignItems:'center'
  },
  textContainer2: {
    alignSelf: "center",
    justifyContent: "center",
    width: "60%",
    borderRadius: 10,
    borderWidth: 3,
    marginTop: 10,
    backgroundColor: '#ffd964'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: '10%',
    //backgroundColor: "blur",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    height: "90%",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 100,
  },
});

export default DetailsResto;
