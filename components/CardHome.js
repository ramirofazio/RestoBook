import React from "react";
import { Card, Text } from "react-native-elements";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

//-------SCREENS--------
import BtnFuncional from "../Screens/Helpers/BtnFuncional.js";

//------ACTIONS---------
import empresaDetail from "../Redux/Actions/empresaDetail.js";

//-----STYLES----------
import globalStyles from "../Screens/GlobalStyles.js";

const CardMenu = ({ resto, navigation }) => {
  //console.log(resto)
  const dispatch = useDispatch();

  const handleOnPress = () => {
    dispatch(empresaDetail(resto));
    navigation.navigate("DetailsResto");
  };

  return (
    <Card style={styles.container}>
      <View>
        <Card.Title style={{ fontSize: 20 }}>{resto.title}</Card.Title>
        <Card.Divider />
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.imagen}
            resizeMode="contain"
            source={
              resto.Img === ""
                ? {
                  uri: "https://images.vexels.com/media/users/3/204941/isolated/preview/d8bc6d74b3da7ee41fc99b6000c1e6a4-trazo-de-puntuacion-de-signo-de-interrogacion.png",
                }
                : { uri: resto.Img }
            }
            resizeMode="contain"
          />
          <Text style={{ padding: 5, textAlign: "center", marginVertical: 5 }}>
            {resto.Description}
          </Text>
          <View style={{}}>
            <TouchableOpacity
              style={globalStyles.btn}
              onPress={() => handleOnPress()}
            >
              <Text>About</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
    imagen: {
        width: 140,
        height: 140,
    },
    container: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default CardMenu;
