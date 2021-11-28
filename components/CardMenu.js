import React from "react";
import { Card, Text } from "react-native-elements";
import { View, Image, StyleSheet } from "react-native";

export default ({ menu }) => {
  return (
    <Card containerStyle={{ borderRadius: 25, height: 230 }} wrapperStyle={{}}>
      <Card.Title>{menu.Title}</Card.Title>
      <Card.Divider />
      <View style={{ position: "relative", alignItems: "center", borderRadius: 10 }} >
        <Image
          style={styles.imagen}
          resizeMode="contain"
          source={{ uri: menu.Img }}
          resizeMode='cover'
        />
        <Text style={{ padding: 5 }}>{menu.Description}</Text>
      </View>
      <Text>$ {menu.Price}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 100,
    borderRadius: 25
  },
})