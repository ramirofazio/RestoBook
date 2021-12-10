import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
//-----STYLES----------
import globalStyles from "../Screens/GlobalStyles.js";
//------ICONS----------
import { Icon } from "react-native-elements";
//------ACTIONS---------
import empresaDetail from "../Redux/Actions/empresaDetail.js";
//-----FIREBASE---------
import firebase from "../database/firebase";
import { getAuth } from "firebase/auth";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

const auth = getAuth();

const CardFavourite = ({ resto, navigation }) => {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const [hearthColor, setHearthColor] = useState("red");
  let infoFavourite = {
    id: resto.id,
    title: resto.title,
    phone: resto.phone,
    address: resto.address,
    img: resto.img,
  };

  const handleOnPress = () => {
    dispatch(empresaDetail(resto));

    navigation.navigate("DetailsResto");
  };

  const removeFromFavourite = async () => {
    if (auth?.currentUser?.uid) {
      try {
        setDeleting(true);
        setHearthColor("grey");
        let docRef = doc(firebase.db, "Users", auth.currentUser.uid);
        await updateDoc(docRef, {
          favourites: arrayRemove(infoFavourite),
        });
      } catch (e) {
        console.log("error remove:", e);
      }
      setDeleting(false);
    }
  };

  return (
    <View
      style={{
        alignSelf: "center",
        backgroundColor: "#f6efd3",
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 25,
        width: "95%",
        height: "80%",
      }}
    >
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
            {deleting ? (
              <ActivityIndicator
                size="large"
                color="#5555"
                // style={globalStyles.imgProfile}
              />
            ) : (
              <Text style={globalStyles.cardsHomeTitle}>{resto.title}</Text>
            )}
          </View>

          <View>
            <Text style={globalStyles.cardsDescriptionText}>
              <Icon
                reverse
                name="map-marker-alt"
                type="font-awesome-5"
                color="grey"
                reverseColor="#ffd964"
                size={11}
              />{" "}
              {resto.address}
            </Text>
          </View>
          <View>
            <Text style={globalStyles.cardsDescriptionText}>
              <Icon
                reverse
                name="phone-alt"
                type="font-awesome-5"
                color="grey"
                reverseColor="#ffd964"
                size={11}
              />{" "}
              {resto.phone}
            </Text>
          </View>
        </View>

        <View style={globalStyles.btnContainerCard}>
          <View>
            <TouchableOpacity
              onPress={() => {
                hearthColor === "red" ? removeFromFavourite() : null;
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

export default CardFavourite;
