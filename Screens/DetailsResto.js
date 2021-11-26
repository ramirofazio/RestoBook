import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';




export const DetailsResto = () => {
    return (
        <Header style={styles.header}>
            {/* {Icon for the menu} */}
            <View>
                <Text style={styles.headerText}>RestoBook</Text>
                <Text style={styles.headerText}>Franco Bri</Text>
            </View>
        </Header>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1
    }
})