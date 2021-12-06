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
const CardMenu = ({ resto, navigation }) => {
  //console.log(resto)
  const dispatch = useDispatch();

  const handleOnPress = () => {
    dispatch(empresaDetail(resto));
    navigation.navigate("DetailsResto");
  };

  return (
    <View style={globalStyles.cardsContainer}>
        <TouchableOpacity
        onPress={() => handleOnPress()}
        >
          <View style={globalStyles.containerImgCard}>
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
          </View>
                
          <View style={globalStyles.cardsDescriptionContainer}>
            <View>
              <Text style={globalStyles.cardsHomeTitle}>{resto.title}</Text>
            </View>

            <View style={{backgroundColor: 'pink'}}>
                <Text style={globalStyles.cardsDescriptionText}>
                  Rating??
                </Text>
            </View>

            <View style={{backgroundColor: 'blue'}}>
              <Text style={globalStyles.cardsDescriptionText}>
                Categoria
              </Text>
            </View>
          </View>

          <View style={globalStyles.btnContainerCard}>
            <View>
              <TouchableOpacity
              onPress={() => alert("llevame a whatsapp")}
            >
              <Image
                style={globalStyles.wspImage}
                // resizeMode="contain"
                source={require("../assets/whatsAppIcon.png")}
              />
            </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Text>COrazon</Text>
              </TouchableOpacity>
            </View>
        </View>
      </TouchableOpacity>
    </View>
    
  );
};

export default CardMenu;
