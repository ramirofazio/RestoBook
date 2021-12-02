import React from "react";
import { Card, Text } from "react-native-elements";
import { View, Image, StyleSheet } from "react-native";
import TeamOutlined from 'react-native-vector-icons/AntDesign' 

const CardReservation = ({persona}) => {
  
  return (
    <Card containerStyle={styles.container} >
      <Card.Title style={{ fontSize: 25}}>{persona.reserva.bar.barName} - {persona.reserva.bar.direccion}</Card.Title>
      {/* <Card.Divider /> */}
      <View style={styles.containerText} >
        <Text style={styles.text}>{persona.reserva.cantidad} < TeamOutlined name='team' color="#392c28" size={15}/></Text>
        <Text style={styles.text}>{persona.reserva.fecha}</Text>
        <Text style={styles.text}>{persona.reserva.horario}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
    text: { 
        textAlign:"center",
      fontSize: 20, 
      fontWeight: "bold"
    },
    container: { 
        borderRadius: 25,
        maxHeight: 100,
        borderWidth: 2, 
        borderColor: 'black', 
        borderStyle: 'dotted',
        backgroundColor: '#e6c2bf'
    },
    containerText: { 
        borderRadius: 10, 
        flexDirection:"row", 
        justifyContent: "space-around", 
        alignItems: "center",
        // paddingVertical: 5 
    }
})

export default CardReservation;