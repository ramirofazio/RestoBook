import React from "react";
import { Card, Text } from "react-native-elements";
import { View, Image, StyleSheet } from "react-native";

const CardMenu = ({ menu }) => {
  console.log(menu)
  return (
    <Card containerStyle={{ borderRadius: 25, maxHeight: 250, minHeight: 150 }} wrapperStyle={{}}>
      <Card.Title style={{ fontSize: 18 }}>{menu.foodName}</Card.Title>
      <Card.Divider />
      <View style={{ position: "relative", alignItems: "center", borderRadius: 10 }} >
        <Image
          style={styles.imagen}
          source={menu.img === "" ? { uri: "https://images.vexels.com/media/users/3/204941/isolated/preview/d8bc6d74b3da7ee41fc99b6000c1e6a4-trazo-de-puntuacion-de-signo-de-interrogacion.png" } : { uri: menu.img }}
        />
        <Text style={{ padding: 5, fontSize: 15, textAlign: "center" }}>{menu.description}</Text>
        <Text style={styles.textPrice}>$ {menu.price}</Text>
      </View>
    </Card>
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
    color: 'blue',
    fontSize: 20,
    fontWeight: "bold",
    position: 'absolute',
    right: 1,
    bottom: 1
  }
})

export default CardMenu;
