import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../GlobalStyles';

export default function BtnFuncional({ nombre, onPress }) {
    return (
        <View style={globalStyles.Container}>
            <TouchableOpacity
                obPress={() => onPress}
                style={globalStyles.btn}
            >
                <Text style={globalStyles.btnText}>
                    {nombre}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
