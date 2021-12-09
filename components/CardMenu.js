import React from "react";
import { Card, Text } from "react-native-elements";
import { View, Image, StyleSheet } from "react-native";
import globalStyles from "../Screens/GlobalStyles";

const CardMenu = ({ menu }) => {
  return (
    <View style={globalStyles.cardsMenuContainer}>
      <View style={globalStyles.cardsMenuDescriptionContainer}>
        <Card.Title style={globalStyles.cardsMenuTitle}>{menu.foodName}</Card.Title>
          <Card.Divider orientation="horizontal" width={1} inset={true} insetType={"right"} color={'grey'} style={{margin: -25}}/>
        <Text style={globalStyles.cardsMenuDescriptionText}>{menu.description}</Text>
        <Text style={styles.textPrice}>$ {menu.price}</Text>
      </View>

      <View style={globalStyles.containerImgCardMenu}>
        <Image
          style={globalStyles.cardsMenuimg}
          source={menu.img === "" ? { uri: "https://images.vexels.com/media/users/3/204941/isolated/preview/d8bc6d74b3da7ee41fc99b6000c1e6a4-trazo-de-puntuacion-de-signo-de-interrogacion.png" } : { uri: menu.img }}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  imagen: {
    width: '70%',
    height: '65%',
    borderRadius: 20,
    resizeMode: 'contain'
  },
  textPrice: {
    color: 'black',
    fontSize: 20,
    fontWeight: "bold",
  }
})

export default CardMenu;
