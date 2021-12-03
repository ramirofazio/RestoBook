//----------REACT UTILS-----------
import React, { useEffect } from "react";
//
//
//----------REDUX UTILS-----------
import { useSelector } from "react-redux";
//
//
//----------REACT-NATIVE UTILS-----------
import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
//
//
//----------FIREBASE UTILS-----------

//
//
//---------SCREENS & COMPONENTS---------------
import CardMenu from "../components/CardMenu";
//
//
//-------STYLES-------

//
//
//-------INITIALIZATIONS-------

//
//---------------------------------------------------------------------------------------//
//
const DetailsResto = () => {
  const empresaDetail = useSelector((state) => state.empresaDetail);
  console.log(empresaDetail)
  const menus = useSelector((state) => state.menus);
  //console.log(menus)s
  const thisMenu = menus.filter((menu) => menu.id === empresaDetail.Id);
  //console.log(thisMenu)
  
  //WhatsApp
  const handleWhatsAppPress = async() => {
    await Linking.openURL('whatsapp://send?text=Hola RestoBook&phone=+541168020511')
}

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{empresaDetail.title}</Text>
      </View>
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
        {thisMenu.length > 0 ? (
          <ScrollView style={styles.showMenu}>
            {thisMenu.map((menu, index) => {
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

        <View style={styles.googleMapsContainer}>
          <MapView
            style={styles.googleMaps}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          ></MapView>
        </View>
        <TouchableOpacity onPress={(e) => handleWhatsAppPress(e)}>
                    <View style={styles.searchIcon}>
                        <Image style={styles.img} source={require('../assets/whatsapp.png') } />
                     </View>
                </TouchableOpacity>
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
