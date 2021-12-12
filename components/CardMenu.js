import React from "react";
import { Card, Text } from "react-native-elements";
import { View, Image, StyleSheet } from "react-native";
import globalStyles from "../Screens/GlobalStyles";

const CardMenu = ({ menu }) => {
  return (
    <View style={globalStyles.menuCardsContainer}>
      <View style={globalStyles.cardsMenuDescriptionContainer}>
        <Card.Title style={globalStyles.cardsMenuTitle}>
          {menu.foodName}
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
          {menu.description}
        </Text>
        <Text style={styles.textPrice}>$ {menu.price}</Text>
      </View>

      <View style={globalStyles.containerImgCardMenu}>
        <Image
          style={globalStyles.cardsMenuimg}
          source={{
            uri: "https://res.cloudinary.com/restobook/image/upload/v1639179500/restohenry/gqtxegrmrooeowtucez9.png",
          }}
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
