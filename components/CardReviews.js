import React, { useState, useEffect } from "react";
import { Card, Text, AirbnbRating } from "react-native-elements";
import { View, Image, StyleSheet } from "react-native";
import globalStyles from "../Screens/GlobalStyles";
import { useSelector } from "react-redux";
import firebase from "../database/firebase";
import { getAuth } from "firebase/auth";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const auth = getAuth();
import { CLOUDINARY_CONSTANT, DEFAULT_PROFILE_IMAGE } from "@env";
export default function CardReviews({ reseña }) {
  const [rating, setRating] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);

  const getImage = async () => {
    const docRef = doc(firebase.db, "Users", reseña.idUser);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let obj = docSnap.data();
      let img = obj.profileImage;
      setUserProfileImage(img);
    }
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={styles.cardsMenuContainer}>
      <View style={globalStyles.cardsMenuDescriptionContainer}>
        <View style={styles.viewRating}>
          <AirbnbRating
            count={5}
            size={10}
            defaultRating={reseña.rating}
            showRating={false}
          ></AirbnbRating>
        </View>
        <Card.Title style={styles.cardsMenuTitle}>{reseña.review}</Card.Title>
        <Text style={globalStyles.cardsMenuDescriptionText}>{}</Text>
      </View>
      <View style={globalStyles.containerImgCardMenu}>
        <Image
          style={globalStyles.cardsMenuimg}
          source={
            userProfileImage
              ? { uri: CLOUDINARY_CONSTANT + userProfileImage }
              : { uri: CLOUDINARY_CONSTANT + DEFAULT_PROFILE_IMAGE }
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsMenuContainer: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "white",
    marginVertical: 5,
    // paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 25,
    width: "100%",
    height: 70,
  },
  viewRating: {
    margin: 5,
  },
  cardsMenuTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
  },
  imagen: {
    width: "70%",
    height: "65%",
    borderRadius: 20,
    resizeMode: "contain",
  },
  textPrice: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});
