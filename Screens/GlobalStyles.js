import React from "react";
import { StyleSheet } from "react-native";



const globalStyles = StyleSheet.create({
    Home: {
        flex: 1,
        backgroundColor: '#ffdfcb'
    },
    btnHome: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    btnText: {
        fontSize: 12.5,
        color: "#392c28",
    },
    btnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: 160,
    },
    Container: {
        alignItems: "center",
        // backgroundColor: "brown",
    },
    btn: {
        backgroundColor: '#ffd964',
        paddingVertical: 8,
        paddingHorizontal: 9,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#b39138',
    },
    img: {
        // alignSelf: 'center',
        height: 40,
        width: 40,
        marginTop: 5,
        alignItems: "center",
        resizeMode: 'contain' // esta linea es para que se adapte al tam;o de la imagen
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        paddingVertical: 10,
        paddingHorizontal: 5,
        color: '#392c28'
    },
    containerTitle: {
        flexDirection: "row",
    },
    navHome: {
        flexDirection: "row",
    },

});

export default globalStyles;