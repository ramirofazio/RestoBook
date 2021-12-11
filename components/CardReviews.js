import React,{useState} from "react";
import { Card, Text, AirbnbRating, Avatar, Rating} from "react-native-elements";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import globalStyles from "../Screens/GlobalStyles";
import { useSelector } from "react-redux";
import moment from 'moment/min/moment-with-locales'

export default function CardReviews ({reseña}) {
  const { idUser, idResto, review, fotoUser, createAt, rating} = reseña
  const createReview= new Date(createAt.seconds * 1000)
  console.log(fotoUser)
  console.log(rating)
  return (
    <View style={styles.cardsMenuContainer}>
      <View style={styles.viewInfo}>
          <Image
            rounded
            style={styles.img}
           source= {fotoUser ?  fotoUser : {uri:"https://images.vexels.com/media/users/3/204941/isolated/preview/d8bc6d74b3da7ee41fc99b6000c1e6a4-trazo-de-puntuacion-de-signo-de-interrogacion.png"}
          }
         />
                <Rating
                    count={5}
                    imageSize={15}
                    readonly
                    startingValue={rating}
                >
                </Rating>
          <Text style={styles.cardsMenuTitle}>{review}</Text>
          <View>
            
          </View>
          <View style={styles.cardDate}>
          <Text style={styles.date}>{moment(createReview).format("LLL")}</Text>
          </View>
            </View>
        </View> 

  );
}

const styles = StyleSheet.create({
  cardsImg:{
    maxHeight: '120%',
    width: '20.6%',
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: -120,
    justifyContent: "space-around",
  },
  img:{
    position: "absolute",
    width:50,
    height:60,
    left:0,
  },  
  cardsMenuContainer: {
    marginTop:20,
    flex: 1,
    height:80,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth:1,
    justifyContent:"space-around"
  },
  viewInfo:{
    flex:1,
    padding:1,
    alignItems:"center",
  },  
  viewRating:{
    backgroundColor:"#f2f2f2"
  },
  cardsMenuTitle: {
    justifyContent:"flex-start",
    margin:10,
    fontWeight: "bold",
  },
  cardDate:{
       maxHeight: '120%',
    width: '20.6%',
    alignSelf: "flex-end",
    alignItems: "center",
  },
  date:{
    color: 'grey',
    fontSize:11,
    marginBottom:0,
    position: "absolute",
    right:0,
  }
})


