import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AirbnbRating, Rating, Card, Text, Icon } from "react-native-elements";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
//------ACTIONS---------
import empresaDetail from "../Redux/Actions/empresaDetail.js";
//-----STYLES----------
import globalStyles from "../Screens/GlobalStyles.js";
//------ICONS----------
//----------FIREBASE UTILS-----------
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
import { useIsFocused } from "@react-navigation/native";
//

const auth = getAuth();

const CardMenu = ({ resto, navigation }) => {
  // const userFavourites = useSelector((state) => state.favourites);
  const [userFavourites, setUserFavourites] = useState();
  const CurrentId = useSelector((state) => state.currentId);
  const [hearthColor, setHearthColor] = useState("grey");

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesResto);
  useEffect(() => {}, []);
  const isFocused = useIsFocused();

  const getFavs = async () => {
    if (CurrentId) {
      const docRef = doc(firebase.db, "Users", CurrentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        let obj = docSnap.data().favourites;
        setUserFavourites(obj);
      }
    } else {
      setUserFavourites(null);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getFavs();
    }
  }, [isFocused]);

  let infoFavourite = {
    id: resto.idResto,
    title: resto.title,
    phone: resto.phone,
    address: resto.location.address,
    img: resto.img,
  };
  const celphone = +541168020511;

  useEffect(() => {
    if (CurrentId) {
      let idFavourites = userFavourites?.map((element) => element.id);
      if (idFavourites?.includes(resto.idResto)) {
        setHearthColor("red");
      } else {
        setHearthColor("grey");
      }
    } else {
      setHearthColor("grey");
    }
  }, [userFavourites]);

  const handleOnPress = () => {
    dispatch(empresaDetail(resto));
    navigation.navigate("DetailsResto");
  };

  const handleWhatsapp = async () => {
    await Linking.openURL(
      `whatsapp://send?text=Hola ${resto.title}, mi nombre es Lucas y quiero generar una reserva&phone=${celphone}`
    );
  };

  const addToFavourite = async () => {
    if (auth?.currentUser?.uid) {
      try {
        setHearthColor("red");
        let docRef = doc(firebase.db, "Users", auth.currentUser.uid);
        await updateDoc(docRef, {
          favourites: arrayUnion(infoFavourite),
        });
      } catch (e) {
        setHearthColor("grey");
        // alert("no estas logueado");
        console.log("error add:", e);
      }
    }
  };

  const removeFromFavourite = async () => {
    if (auth?.currentUser?.uid) {
      try {
        setHearthColor("grey");
        let docRef = doc(firebase.db, "Users", auth.currentUser.uid);
        await updateDoc(docRef, {
          favourites: arrayRemove(infoFavourite),
        });
      } catch (e) {
        console.log("error remove:", e);
      }
    }
  };

  return (
    <View style={globalStyles.cardsContainer}>
      <TouchableOpacity onPress={() => handleOnPress()}>
        <View style={globalStyles.containerImgCard}>
          <Image
            style={globalStyles.cardsHomeimg}
            source={{
              uri: "https://res.cloudinary.com/restobook/image/upload/v1639178763/restohenry/hk0ociectefbdchh233r.png",
            }}
          />
        </View>

        <View style={globalStyles.cardsDescriptionContainer}>
          <View>
            <Text style={globalStyles.cardsHomeTitle}>{resto.title}</Text>
          </View>

          <View>
            <AirbnbRating
              showRating={false}
              size={20}
              // reviews={["Bad", "OK", "Good", "Very Good","Amazing"]}
              // reviewSize={17}
              // starContainerStyle={{marginTop:-15}}
              isDisabled={true} // este es para que los users no puedan cambiar
              selectedColor="#f1c40f"
              unSelectedColor="lightgrey"
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
              onPress={() => {
                // pressed === true && usuario logueado === false ? alert('logeate primero') : //ESTO ES PARA DECIR QUE
                // SI UN USARUIO NO LOGUEADO QUIERE GUARDAR ALGO EN FAVS QUE SE LOGUEE PRIMERO
                hearthColor === "grey"
                  ? addToFavourite()
                  : removeFromFavourite();
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
