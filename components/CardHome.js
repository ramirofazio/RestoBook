import React from "react";
import { Card, Text } from "react-native-elements";
import { View, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useDispatch } from "react-redux";
import { AirbnbRating, Rating } from 'react-native-elements';
//-------SCREENS--------
import BtnFuncional from "../Screens/Helpers/BtnFuncional.js";
//------ACTIONS---------
import empresaDetail from "../Redux/Actions/empresaDetail.js";
//-----STYLES----------
import globalStyles from "../Screens/GlobalStyles.js";
//------ICONS----------\
import HeartOutlined from "react-native-vector-icons/AntDesign";
import { Icon } from "react-native-elements";

const CardMenu = ({ resto, navigation }) => {
  //console.log(resto)
  const dispatch = useDispatch();

  const celphone = +541168020511;

  const handleOnPress = () => {
    dispatch(empresaDetail(resto));
    navigation.navigate("DetailsResto");
  };

  const handleWhatsapp = async () => {
    await Linking.openURL(`whatsapp://send?text=Hola ${resto.title}, mi nombre es Lucas y quiero generar una reserva&phone=${celphone}`)
  }

  

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

          <View >
          <AirbnbRating 
            showRating={false}
            size={20}
            // isDisabled={true} // este es para que los users no puedan cambiar
            selectedColor='#f1c40f' 
            unSelectedColor='lightgrey'
            tintColor= "#f6efd3"
          />
          {/* <Rating
            type= 'custom'
            // readonly={true} // este es para que los users no puedan cambiar
            ratingColor='#f1c40f' // color stars seleccionadas
            ratingBackgroundColor='lightgrey' // color stars sin seleccion
            tintColor='#f6efd3' // fondo
            imageSize={25}
          /> */}
          </View>

          <View >
            <View style={globalStyles.categoriesView}>
              <Text style={globalStyles.categoriesText}>  Categoria de local</Text>
            </View>
          </View>
        </View>

        <View style={globalStyles.btnContainerCard}>
          <View>
            <TouchableOpacity
              onPress={() => handleWhatsapp()}
            >
              <Image
                style={globalStyles.wspImage}
                // resizeMode="contain"
                source={require("../assets/whatsAppIcon.png")}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity 
              onPress={() => alert('FAVORITOS!')}
            >
              <Icon
                raised
                name='heart'
                type='antdesign'
                color='red'
                size={19}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>

  );
};

export default CardMenu;
