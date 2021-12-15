import React from "react";
import { Card, Text, Icon } from "react-native-elements";
import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import globalStyles from "../Screens/GlobalStyles";
import { CLOUDINARY_CONSTANT, DEFAULT_FOOD_IMAGE } from "@env";
import glutenFree from "../assets/sin-gluten.png";
import vegan from "../assets/vegano.png";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../database/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import ItemToModify from "../Redux/Actions/ItemToModify";
const auth = getAuth();
const CardMenu = ({ menu, navigation, setmodalMenuVisible }) => {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.currentId);

  const deleteItem = async () => {
    let docRef = doc(firebase.db, "Restos", menu.idResto);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let obj = docSnap.data();
      let target = obj.menu.filter(
        (element) =>
          element.foodName === menu.foodName &&
          element.description === menu.description
      );
      let realTarget = target[0];
      if (realTarget) {
        await updateDoc(docRef, {
          menu: arrayRemove(realTarget),
        });
      }
      setmodalMenuVisible(false);
    }
  };

  const updateItem = () => {
    let itemToModify = menu;
    dispatch(ItemToModify(itemToModify));
    deleteItem();
    setmodalMenuVisible(false);
    navigation.navigate("ModifyMenuResto");
  };

  return (
    <View style={globalStyles.menuCardsContainer}>
      <View style= {{flexDirection: "row", justifyContent:'flex-end', marginVertical: -15}}>
        <Icon
          raised
          name="close"
          type="antdesign"
          color='#161616'
          size={12}
          onPress={() => Alert.alert('Desea eliminar', 'permanentemente este item del menu?',
          [
            {
              text: "Eliminar",
              onPress: () => alert('eliminado')
            },
            {
              text: "Cancelar",
            },
          ],
          {
            cancelable: true,
          }
          )}
        />
        <Icon
          raised
          name="edit"
          type="antdesign"
          color='#161616'
          size={12}
          onPress={() => Alert.alert('Desea editar', 'este item del menu?',
          [
            {
              text: "Editar",
              onPress: () => alert('no se que hara este boton')
            },
            {
              text: "Cancelar",
            },
          ]
          )}
        />
      </View>
      
      <View style={globalStyles.cardsMenuDescriptionContainer}>
        <Card.Title style={globalStyles.cardsMenuTitle}>
          {menu.foodName}{" "}
          {/* {menu.idUser === currentId ? (
            <TouchableOpacity
              onPress={() => updateItem()}
              style={{ backgroundColor: "red", width: 30, height: 30 }}
            >
              <Text> Editar</Text>
            </TouchableOpacity>
          ) : null} */}
        </Card.Title>
        <Card.Divider
          orientation="horizontal"
          width={1}
          inset={true}
          insetType={"right"}
          color={"rgba(22, 22, 22, .2)"}
          style={{ marginTop: -25 }}
        />
        <Text style={globalStyles.cardsMenuDescriptionText}>
          {menu.description}{" "}
          {menu.glutenFree ? (
            <Image source={glutenFree} style={{ width: 20, height: 20 }} />
          ) : null}{" "}
          {menu.vegan ? (
            <Image source={vegan} style={{ width: 20, height: 20 }} />
          ) : null}
        </Text>

        <Text style={styles.textPrice}>
          $ {menu.price}
          {/* {menu.idUser === currentId ? (
            <TouchableOpacity onPress={() => updateItem()}>
              <Text> J</Text>
            </TouchableOpacity>
          ) : null} */}
        </Text>
      </View>

      <View style={globalStyles.containerImgCardMenu}>
        <Image
          style={globalStyles.cardsMenuimg}
          source={{
            uri: CLOUDINARY_CONSTANT + menu.img,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CardMenu;
