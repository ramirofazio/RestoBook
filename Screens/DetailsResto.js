//----------REACT UTILS-----------
import React, { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
//
//
//----------REDUX UTILS-----------
import { useSelector } from "react-redux";
//
//
//----------REACT-NATIVE UTILS-----------
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
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
//
//
//-------STYLES-------
import globalStyles from "./GlobalStyles";
//
//
//----------CONSTANTES--------------
const ENTRADAS = "ENTRADAS";
const PLATO_PRINCIPAL = "PLATO PRINCIPAL";
const GUARNICION = "GUARNICION";
const BEBIDA = "BEBIDA";
const POSTRES = "POSTRES";
//
//
//-------INITIALIZATIONS-------
const auth = getAuth();
//
//---------------------------------------------------------------------------------------//
//
const DetailsResto = ({ navigation }) => {
  //--------------------------MERCADO PAGO--------------------------
  const [precioCabeza, setPrecioCabeza] = useState();
  const [cantLugares, setCantLugares] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  //--------------------------FILTROS CATEGORY--------------------------
  const [menuCategory, setMenuCategory] = useState();

  const empresaDetail = useSelector((state) => state.empresaDetail);
  const { manifest } = Constants;
  const { location } = empresaDetail;
  const number = "+541168020511";
  //WhatsApp
  const handleWhatsAppPress = async () => {
    await Linking.openURL(
      `whatsapp://send?text=Hola RestoBook&phone=${number}`
    );
  };
  const [menuArr, setMenuArr] = useState([]);
  const onPressReservar = async (cantLugares, precioCabeza) => {
    const url = await axios({
      method: "POST",
      url: "http://192.168.0.10:19006/checkout",
      data: {
        restoName: empresaDetail.title,
        quantity: cantLugares,
        unit_price: precioCabeza,
      },
    });
    setModalVisible(false);
    navigation.navigate("WebViewScreen", {
      url: url.data,
    });
  };

  const getMenu = () => {
    const q = query(collection(firebase.db, "Restos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let menu = [];
      querySnapshot.forEach((doc) => {
        if (doc.id === empresaDetail.idResto) {
          let obj = doc.data();
          menu = obj.menu;
          setMenuArr(menu);
        }
      });
    });
    setMenuCategory("");
  };

  useEffect(() => {
    getMenu();
  }, []);

  const handleCategory = async (category) => {
    const docRef = doc(firebase.db, "Restos", empresaDetail.idResto);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const menuResto = docSnap.data().menu;

      const result = menuResto.filter(
        (menu) => menu.category === category.toLowerCase()
      );

      if (result.length === 0) {
        alert("No hay comidas con esta categoria");
        getMenu();
      } else {
        setMenuCategory(result);
      }
    }
  };

  return (
    <View style={globalStyles.Home}>
      <View style={{ backgroundColor: "#333a" }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            marginVertical: 10,
            color: "#fff",
          }}
        >
          {empresaDetail.title}
        </Text>
      </View>

      <View>
        <View
          style={{
            paddingVertical: 2,
            paddingHorizontal: 5,
            marginVertical: 7,
            marginHorizontal: 5,

            borderWidth: 2,
            borderColor: "#333a",
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={() => getMenu()}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                padding: 1,
                alignSelf: "center",
              }}
            >
              Todas Las Comidas
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoriesContainer}>
          <View style={globalStyles.categoriesView}>
            <TouchableOpacity onPress={() => handleCategory(ENTRADAS)}>
              <Text style={globalStyles.categoriesText}>Entradas</Text>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.categoriesView}>
            <TouchableOpacity onPress={() => handleCategory(PLATO_PRINCIPAL)}>
              <Text style={globalStyles.categoriesText}>Plato Principal</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.categoriesView}>
            <TouchableOpacity onPress={() => handleCategory(GUARNICION)}>
              <Text style={globalStyles.categoriesText}>Guarnicion</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.categoriesView}>
            <TouchableOpacity onPress={() => handleCategory(BEBIDA)}>
              <Text style={globalStyles.categoriesText}>Bebidas</Text>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.categoriesView}>
            <TouchableOpacity onPress={() => handleCategory(POSTRES)}>
              <Text style={globalStyles.categoriesText}>Postres</Text>
            </TouchableOpacity>
          </View>
        </View>
        {menuArr.length > 0 ? (
          <ScrollView style={styles.showMenu}>
            {menuCategory
              ? menuCategory.map((menu, index) => {
                  return (
                    <CardMenu key={index} menu={menu}>
                      {" "}
                    </CardMenu>
                  );
                })
              : menuArr.map((menu, index) => {
                  return (
                    <CardMenu key={index} menu={menu}>
                      {" "}
                    </CardMenu>
                  );
                })}
          </ScrollView>
        ) : (
          <Text
            style={{ alignSelf: "center", fontSize: 30, marginVertical: 30 }}
          >
            {" "}
            Add a food to see it!
          </Text>
        )}
        <View
          style={globalStyles.btn}
          onTouchStart={() => setModalVisible(!modalVisible)}
        >
          <TouchableOpacity>
            <Text>
              <MaterialIcons
                name="payment"
                size={20}
                color="black"
              ></MaterialIcons>{" "}
              Quiero Reservar !
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.googleMapsContainer}>
          <MapView
            style={styles.googleMaps}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.004757,
              longitudeDelta: 0.006866,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              pinColor="#0072B5"
            ></Marker>
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={globalStyles.touchLog}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text onPress={() => setModalVisible(false)}> X </Text>
            </TouchableOpacity>
            <Text>Selecciona la cantidad de lugares</Text>
            <TextInput
              placeholder="Cantidad de lugares"
              style={{ backgroundColor: "#bd967e", width: "80%" }}
              keyboardType="numeric"
              onChangeText={(value) => setCantLugares(parseInt(value))}
            ></TextInput>
            <Text>Precio por cabeza otorgado por Empresa seria:</Text>
            <TextInput
              placeholder="Cantidad de lugares"
              style={{ backgroundColor: "#bd967e", width: "80%" }}
              keyboardType="numeric"
              onChangeText={(value) => setPrecioCabeza(parseInt(value))}
            ></TextInput>
            <Text style={{ fontSize: 30, color: "blue" }}>
              Precio por cabeza ${precioCabeza}
            </Text>
            <TouchableOpacity
              style={globalStyles.touchLog}
              onPress={() => onPressReservar(cantLugares, precioCabeza)}
            >
              <Text>Reservar mi lugar por ${cantLugares * precioCabeza}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
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
    marginBottom: 5,
  },
  showMenu: {
    height: 250,
    padding: 10,
    borderWidth: 0,
  },
  googleMapsContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
  },
  googleMaps: {
    height: 250,
    borderRadius: 30,
  },
  wppIcon: {
    height: 30,
    marginLeft: 10,
    borderRadius: 10,
    width: 40,
    backgroundColor: "#ffd964",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b39138",
  },
  img: {
    margin: 5,
    height: 20,
    width: 20,
    alignItems: "center",
  },
  textContainer2: {
    alignSelf: "center",
    justifyContent: "center",
    width: "60%",
    borderRadius: 10,
    borderWidth: 3,
    marginTop: 10,
    backgroundColor: "#ffd964",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 30,
      height: 30,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DetailsResto;
