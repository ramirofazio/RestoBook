import React from "react";
import { Card, Text } from "react-native-elements";
import { View, Image, StyleSheet } from "react-native"; 4
import BtnFuncional from "../Screens/Helpers/BtnFuncional.js";

const CardMenu = ({ resto, navigation }) => {

    const handleOnPress = () => {
        
    }

    return (
        <Card style={styles.container}>
            <View style={{}}>
                <Card.Title>{resto.Title}</Card.Title>
                <Card.Divider />
                <View style={{ alignItems: "center" }}>
                    <Image
                        style={styles.imagen}
                        resizeMode="contain"
                        source={{ uri: resto.Img }}
                        resizeMode="contain"
                    />
                    <Text style={{ padding: 5 }}>{resto.Description}</Text>
                    <View style={{}}>
                        <BtnFuncional nombre="About" onPress={handleOnPress()} navigation={navigation} />
                    </View>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    imagen: {
        width: 140,
        height: 140,
    },
})

export default CardMenu;