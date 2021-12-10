import React,{useState} from "react";
import { Card, Text, AirbnbRating} from "react-native-elements";
import { View, Image, StyleSheet } from "react-native";
import globalStyles from "../Screens/GlobalStyles";
import { useSelector } from "react-redux";

export default function CardReviews ({reseña}) {
  const [rating, setRating] = useState(null)
  return (
    <View style={styles.cardsMenuContainer}>
      <View style={globalStyles.cardsMenuDescriptionContainer}>
        
        <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    size={10}
                    defaultRating={reseña.rating}
                    showRating={false}
                >
                </AirbnbRating>
            </View>
        <Card.Title style={styles.cardsMenuTitle}>{reseña.review}</Card.Title>
        <Text style={globalStyles.cardsMenuDescriptionText}>{}</Text>
      </View>
      <View style={globalStyles.containerImgCardMenu}>
         <Image
          style={globalStyles.cardsMenuimg}
          source={ reseña.fotoUser === "" ? { uri: "https://images.vexels.com/media/users/3/204941/isolated/preview/d8bc6d74b3da7ee41fc99b6000c1e6a4-trazo-de-puntuacion-de-signo-de-interrogacion.png" } : { uri: reseña.fotoUser }} 
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
    height: 70
  },
  viewRating:{
  margin:5
  },
  cardsMenuTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    width: '100%'
  },
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


