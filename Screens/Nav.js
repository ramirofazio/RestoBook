import React from 'react';
import { View, Text, Image } from 'react-native';
import Btn from './Helpers/Btns.js'

export default function Nav({ title, navigation }) {
    return (
        <View style={{ display: "flex", flexDirection: "row" }}>
            <Image source={require('../assets/icon.png')} style={{ width: 30, height: 30 }} />
            <Text>{title}</Text>
            <Btn nombre="Login" ruta="GlobalLogin" navigation={navigation} />

            <Btn nombre="Reservas" ruta="#" navigation={navigation} />

            <Btn nombre="Perfil" ruta="#" navigation={navigation} />

        </View>
    )
}