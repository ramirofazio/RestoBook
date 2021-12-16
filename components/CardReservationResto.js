import React, {  useEffect } from "react";
import { useSelector } from "react-redux";;
import { Card, Text, Badge } from "react-native-elements";
import { View, Image, StyleSheet, Linking, TouchableOpacity, Touchable} from "react-native";
import TeamOutlined from 'react-native-vector-icons/AntDesign'
import globalStyles from "../Screens/GlobalStyles";
import { getAuth } from "firebase/auth";
import { Icon } from 'react-native-elements';
import CurrentId from "../Redux/Actions/CurrentId";



const auth = getAuth();

const CardReservationResto = ({ date, precio, cantCupos, email }) => {

 
  const precioTotal = precio * cantCupos
  console.log(precioTotal)
  // const celphone = "+54 9" + "NUMERO RESTO";
  // const trimmedName = auth?.currentUser?.email?.split("@")[0];
  // const handleWhatsapp = async () => {
    //   await Linking.openURL(
      //     `whatsapp://send?text=Hola ${nameResto}, mi nombre es ${trimmedName} y quiero generar una reserva&phone=${'+5492477313700'}`
      //   );
      // };
      console.log(email)
      console.log( "currernt id" ,CurrentId)
      
      return (
    <View style={globalStyles.cardsContainer}>
      <View>
        {/* <Text size={10}>{email}</Text>
        <Card.Divider
          orientation="horizontal"
          width={1.5}
          inset={true}
          insetType={"middle"}
          color={"#0005"}
        /> */}
      </View>
      <View style={styles.descriptionContainer}>
        <View style={{ padding:10, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between" }}>
          <Text style={{ marginVertical: 5, fontWeight: "bold"}}>Email: {email}</Text>
          <Text style={{ marginVertical: 5,  fontWeight: "bold"}}>Día: {date}</Text>
          <Text style={{ marginVertical: 5,  fontWeight: "bold" }}>Precio de la reserva: ${precioTotal}</Text>
        <View style={{marginVertical: 5, alignSelf:"center",   fontWeight: "bold"}}>
          <Text><TeamOutlined name='team' color="#161616" size={20} />{cantCupos}</Text>
        </View>
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    marginVertical: -8,
    alignItems: "center",
    justifyContent: "space-around"
  },
})

export default CardReservationResto;