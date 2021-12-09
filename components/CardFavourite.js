//----------REACT UTILS-----------
import React, { useState, useEffect } from "react";
//
//----------REDUX UTILS-----------

//
//
//----------REACT-NATIVE UTILS-----------

import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  BottomSheet,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";

//
//
//----------FIREBASE UTILS-----------

//
//
//---------SCREENS---------------

//
//
//-------STYLES-------
import globalStyles from "../Screens/GlobalStyles.js";
//
//
//-------INITIALIZATIONS-------
import { CLOUDINARY_CONSTANT, DEFAULT_PROFILE_IMAGE } from "@env";
//
//---------------------------------------------------------------------------------------//
//

const CardFavourite = ({ fav, navigation }) => {
  let prettierAddress = `${fav.address.split(",")[0]},${
    fav.address.split(",")[1]
  }`;
  return (
    <View style={globalStyles.cardsContainer}>
      <View style={globalStyles.containerImgCard}>
        <Image
          style={globalStyles.cardsHomeimg}
          source={
            fav.img === ""
              ? {
                  uri: CLOUDINARY_CONSTANT + DEFAULT_PROFILE_IMAGE,
                }
              : { uri: CLOUDINARY_CONSTANT + DEFAULT_PROFILE_IMAGE }
          }
        />
      </View>
      <View style={globalStyles.cardsDescriptionContainer}>
        <View>
          <Text style={globalStyles.cardsHomeTitle}>{fav.title}</Text>
        </View>

        <View>
          <Text style={globalStyles.cardsDescriptionText}>{fav.phone}</Text>
          <Text style={globalStyles.cardsDescriptionText}>
            {prettierAddress}
          </Text>
          <Text style={globalStyles.cardsDescriptionText}>⭐⭐⭐⭐⭐</Text>
        </View>
      </View>
    </View>
  );
};

export default CardFavourite;
