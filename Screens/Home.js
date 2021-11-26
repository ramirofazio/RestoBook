import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';


export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <Button
                style={styles.btn}
                title="Register"
                onPress={() => navigation.navigate("Register User")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "40%",
        height: "10%",
    },
    btn: {

    }
});