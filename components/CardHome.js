
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AirbnbRating, Rating } from 'react-native-elements';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
//------ACTIONS---------
import empresaDetail from "../Redux/Actions/empresaDetail.js";
//-----STYLES----------
import globalStyles from "../Screens/GlobalStyles.js";
//------ICONS----------
import { Icon, Text } from "react-native-elements";
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
//

const auth = getAuth();

const CardMenu = ({ resto, navigation }) => {
  //console.log(resto)
  const [hearthColor, setHearthColor] = useState("grey");
  const [pressed, setPressed] = useState(false)
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesResto);

  const celphone = +541168020511;

  const handleOnPress = () => {
    dispatch(empresaDetail(resto));
    navigation.navigate("DetailsResto");
  };

  const handleWhatsapp = async () => {
    await Linking.openURL(
      `whatsapp://send?text=Hola ${resto.title}, mi nombre es Lucas y quiero generar una reserva&phone=${celphone}`
    );
  };

  

  return (
    <View style={globalStyles.cardsContainer}>
      <TouchableOpacity onPress={() => handleOnPress()}>
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
            // reviews={["Bad", "OK", "Good", "Very Good","Amazing"]}
            // reviewSize={17}
            // starContainerStyle={{marginTop:-15}}
            isDisabled={true} // este es para que los users no puedan cambiar
            selectedColor='#f1c40f' 
            unSelectedColor='lightgrey'
          />
          {/* <Rating
          showRating
            type= 'custom'
            // readonly={true} // este es para que los users no puedan cambiar
            ratingColor='#f1c40f' // color stars seleccionadas
            ratingBackgroundColor='lightgrey' // color stars sin seleccion
            tintColor='#f6efd3' // fondo
            imageSize={25}
          /> */}
          </View>

          <View>
            <View style={globalStyles.categoriesView}>
              <Text style={globalStyles.categoriesText}>{resto.category}</Text>
            </View>
          </View>
        </View>

        <View style={globalStyles.btnContainerCard}>
          <View>
            <TouchableOpacity onPress={() => handleWhatsapp()}>
              <Image
                style={globalStyles.wspImage}
                // resizeMode="contain"
                source={require("../assets/whatsAppIcon.png")}
              />
            </TouchableOpacity>
          </View>
            
          <View>
            <TouchableOpacity 
              onPress={async () => {
                let infoFavourite = {
                  id: resto.idResto,
                  title: resto.title,
                  phone: resto.phone,
                  address: resto.location.address,
                  img: resto.img
                }
                // pressed === true && usuario logueado === false ? alert('logeate primero') : //ESTO ES PARA DECIR QUE
                // SI UN USARUIO NO LOGUEADO QUIERE GUARDAR ALGO EN FAVS QUE SE LOGUEE PRIMERO
                hearthColor === "grey"
                  ? setHearthColor("red")
                  : setHearthColor("grey")
                // console.log(infoFavourite)
                try {
                  let docRef = doc(firebase.db, "Users", auth.currentUser.uid);
                  await updateDoc(docRef, {
                    favourites: arrayUnion(infoFavourite),
                  });
                  alert('Agregado a favoritos!')
                } catch (e) {console.log(error)}
              }} 
            >
              <Icon
                raised
                name="heart"
                type="antdesign"
                color={hearthColor}
                style={{ border: "solid 1px blue" }}
                iconStyle="red"
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
