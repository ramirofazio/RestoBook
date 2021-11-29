import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Btn from './Helpers/Btns.js'
import globalStyles from './GlobalStyles.js';
import { useSelector } from 'react-redux';



export default function NavDetail({ navigation }) {

    const empresaDetail = useSelector((state) => state.empresaDetail);

    return (
        <View style={globalStyles.navHome}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 30, marginHorizontal: -13 }}>
                <Image source={require('../assets/icon.png')} style={globalStyles.img} />
                <Text style={globalStyles.title}>{empresaDetail.Title}</Text>
                <View style={globalStyles.btnContainer}>
                    <Btn nombre="Add Food!" ruta="AddMenuResto" navigation={navigation} />
                </View>
            </View>
        </View>
    )
}

