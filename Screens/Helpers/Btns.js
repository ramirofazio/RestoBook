import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../GlobalStyles';

export default function Btn({ nombre, ruta, navigation }) {

    return (
        <View style={globalStyles.Container}>
            <TouchableOpacity
                onPress={() => navigation.navigate(ruta)}
                style={globalStyles.btn}
            >
                <Text style={globalStyles.btnText}>
                    {nombre}
                </Text>
            </TouchableOpacity>
        </View>
    )
}