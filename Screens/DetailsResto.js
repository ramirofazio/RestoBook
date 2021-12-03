//----------REACT UTILS-----------
import React, { useState, useEffect } from "react";
//
//
//----------REDUX UTILS-----------
import { useSelector } from "react-redux";
//
//
//----------REACT-NATIVE UTILS-----------
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
//
//
//----------FIREBASE UTILS-----------
import { getAuth } from "firebase/auth";
import { onSnapshot, collection, query } from "firebase/firestore";
import firebase from "../database/firebase";
//
//
//---------SCREENS & COMPONENTS---------------
import CardMenu from "../components/CardMenu";
//
//
//-------STYLES-------
import globalStyles from './GlobalStyles';

//
//
//-------INITIALIZATIONS-------
const auth = getAuth();
//
//---------------------------------------------------------------------------------------//
//
const DetailsResto = () => {
  const empresaDetail = useSelector((state) => state.empresaDetail);
  const [menuArr, setMenuArr] = useState([]);
  //Tiene que desactivar el boton en los comercios que no sean del logueado


  useEffect(() => {
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
  }, []);
  return (
    <View style={globalStyles.Home}>
      <View style={styles.content}>
        <View style={styles.categoriesContainer}>
          <View style={styles.categoriesView}>
            <Text style={styles.categoriesText}>Fast Food</Text>
          </View>
          <View style={styles.categoriesView}>
            <Text style={styles.categoriesText}>Home-made pastas</Text>
          </View>
          <View style={styles.categoriesView}>
            <Text style={styles.categoriesText}>Meats</Text>
          </View>
          <View style={styles.categoriesView}>
            <Text style={styles.categoriesText}>Deserts</Text>
          </View>
          <View style={styles.categoriesView}>
            <Text style={styles.categoriesText}>Drinks</Text>
          </View>
        </View>
        {
          menuArr.length > 0 ? <ScrollView style={styles.showMenu}>
            {menuArr.map((menu, index) => {
              return (
                <CardMenu key={index} menu={menu}> </CardMenu>
              )
            }
            )}
          </ScrollView> : <Text style={{ alignSelf: "center", fontSize: 30, marginVertical: 30 }}> Add a food to see it!</Text>
        }

        <View style={styles.googleMapsContainer}>
          <MapView
            style={styles.googleMaps}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
          </MapView>
        </View>
      </View>
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
  content: {
    padding: 10,
  },
  categoriesContainer: {
    height: 33,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 20,
    marginBottom: 5,
  },
  categoriesView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 2,
  },
  categoriesText: {
    fontWeight: "bold",
    fontSize: 13,
    padding: 1,
  },
  showMenu: {
    height: 250,
    padding: 10,
    borderWidth: 0,
    //borderRadius: 50
  },
  googleMapsContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    //backgroundColor: "red"
  },
  googleMaps: {
    height: 130,
    borderRadius: 20,
  },
});

export default DetailsResto;
