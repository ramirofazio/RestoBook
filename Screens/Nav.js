import React from 'react';
import { View, Text, Image } from 'react-native';
import Btn from './Helpers/Btns.js'
import globalStyles from './GlobalStyles.js';
import UserOutlined from 'react-native-vector-icons/AntDesign';
import TagOutlined from 'react-native-vector-icons/AntDesign';


export default function Nav({ title, navigation }) {
    return (
        //JOSE
        // <View style={{ display: "flex", flexDirection: "row" }}>
        //     <Image source={require('../assets/icon.png')} style={{ width: 30, height: 30 }} />
        //     <Text>{title}</Text>
        //     <Btn nombre="Login" ruta="GlobalLogin" navigation={navigation} />

        //     <Btn nombre="Reservas" ruta="#" navigation={navigation} />

        //     <Btn nombre="Perfil" ruta="#" navigation={navigation} />

        //LAIAL
        <View style={globalStyles.navHome}>
            <View style={globalStyles.containerTitle}>
                <Image source={require('../assets/icon.png')} style={globalStyles.img} />
                <Text style={globalStyles.title}>{title}</Text>
            </View>
            <View style={globalStyles.btnContainer}>
                <Btn nombre="Login" ruta="Register User" navigation={navigation} />
                <Btn nombre={<TagOutlined name='tag' color="#392c28" size={15} />} ruta="#" navigation={navigation} />
                <Btn nombre={<UserOutlined name='user' color="#392c28" size={15} />} ruta="#" navigation={navigation} />
            </View>
        </View>
    )
}

