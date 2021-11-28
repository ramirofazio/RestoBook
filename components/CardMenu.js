import React from "react";
import { Card, Text } from "react-native-elements";
import { View, Image, StyleSheet } from "react-native";

const CardMenu = ({ menu }) => {
  return (
    <Card containerStyle={{ borderRadius: 25, maxHeight: 350, minHeight: 200 }} wrapperStyle={{}}>
      <Card.Title style={{ fontSize: 18 }}>{menu.Title}</Card.Title>
      <Card.Divider />
      <View style={{ position: "relative", alignItems: "center", borderRadius: 10 }} >
        <Image
          style={styles.imagen}
          source={{ uri: menu.Img }}
        />
        <Text style={{ padding: 5, fontSize: 15 }}>{menu.Description}</Text>
        <Text style={styles.textPrice}>$ {menu.Price}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: '70%',
    height: '65%',
    borderRadius: 20
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
