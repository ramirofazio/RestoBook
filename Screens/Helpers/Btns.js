import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function Btn({ nombre, ruta, navigation }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate(ruta)}
            >
                <Text>
                    {nombre}
                </Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
        backgroundColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

