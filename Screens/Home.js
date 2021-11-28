import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Btn from './Helpers/Btns.js'
import globalStyles from './GlobalStyles.js';
import SearchOutlined  from 'react-native-vector-icons/AntDesign'

export default function Home({ navigation }) {
    return (
        <ScrollView style={globalStyles.Home}>
            <View style={globalStyles.btnHome}>
                <Btn nombre="Ciudad" ruta="#" navigation={navigation} />
                <Btn nombre= 'Buscar' ruta = '#' navigation={navigation}/>
                <Btn nombre="Categorias" ruta="#" navigation={navigation} />
            </View>

        </ScrollView>
    )
}



