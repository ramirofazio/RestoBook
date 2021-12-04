import React from "react";
import { Card, Text } from "react-native-elements";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
//-------SCREENS--------
import BtnFuncional from "../Screens/Helpers/BtnFuncional.js";

//------ACTIONS---------
import empresaDetail from "../Redux/Actions/empresaDetail.js";
//-----STYLES----------
import globalStyles from "../Screens/GlobalStyles.js";
const CardMenu = ({ resto, navigation, icon }) => {
  //console.log(resto)
  const dispatch = useDispatch();

  const handleOnPress = () => {
    dispatch(empresaDetail(resto));
    navigation.navigate("DetailsResto");
  };

  return (
    <TouchableOpacity
      style={globalStyles.cardsContainer}
      onPress={() => handleOnPress()}
    >
      <View>
        <Text style={globalStyles.cardsHomeTitle}>{resto.title}</Text>
        <View style={globalStyles.cardsInfoContainer}>
          <Image
            style={globalStyles.cardsHomeimg}
            source={
              resto.Img === ""
                ? {
                  uri: "https://images.vexels.com/media/users/3/204941/isolated/preview/d8bc6d74b3da7ee41fc99b6000c1e6a4-trazo-de-puntuacion-de-signo-de-interrogacion.png",
                }
                : { uri: resto.Img }
            }
          />
          <View style={{
            width: 30, height: 30, marginLeft: 125, marginTop: 10,
          }}>
            <TouchableOpacity
              onPress={() => alert("llevame a whatsapp")}
            >
              <Image
                style={globalStyles.wspImage}
                resizeMode="contain"
                source={require("../assets/whatsAppIcon.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={globalStyles.cardsDescriptionContainer}>
            <View style={{ alignSelf: "flex-end" }}>
              <Text style={globalStyles.cardsDescriptionText}>
                Categoria
              </Text>
              <Text style={globalStyles.cardsDescriptionText}>
                Rating??
              </Text>
            </View>
          </View>
        </View>
      </View >
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: 140,
    height: 140,
  },
  container: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  }
})

export default CardMenu;
