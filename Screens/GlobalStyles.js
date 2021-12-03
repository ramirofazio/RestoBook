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
  },
  cardsContainer: {
    alignSelf: "center",
    backgroundColor: "#f6efd2",
    marginHorizontal: 10,
    marginVertical: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 25,
    width: "95%",
    height: "14%",

    //backgroundColor: "yellow",
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
    height: 40,
    width: 40,
    marginTop: 5,
    alignItems: "center",
    resizeMode: 'contain' // esta linea es para que se adapte al tam;o de la imagen
  },
  cardsHomeimg: {
    //backgroundColor: "red",
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 25,
    marginTop: -45, //VER COMO ARREGLAR 
  },
  cardsInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardsDescriptionContainer: {
    //backgroundColor: "red",
    flex: 1,
    alignSelf: "center",
    marginTop: -45,
  },
  cardsDescriptionText: {
    textAlign: "center"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: '#392c28'
  },
  cardsHomeTitle: {
    //backgroundColor: "blue",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: -15,
  },
  wspImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  componentTitle: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 30,
    color: "#000"

  },
  containerTitle: {
    flexDirection: "row",
  },
  navHome: {
    flexDirection: "row",
    width: "100%",
  },
  touchLog: {
    marginTop: 10,
    maxWidth: "100%",
    width: '50%',
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#bd967e",
    padding: 10,
  },
  touchFlag: {
    marginTop: 10,
    maxWidth: "100%",
    width: '50%',
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ffdfcb",
    borderWidth: 2,
    borderColor: "#bd967e",
    padding: 10,
  },
  fontLog: {
    color: "#392c28",
    fontWeight: "bold"
  },
  container: {
    flex: 6,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    width: "100%",
  },
  texts: {
    textAlign: "center",
    width: "100%",
    fontSize: 14.5,
    fontWeight: "bold",
  },
  textDownButton: {
    textAlign: "center",
    width: "100%",
    fontSize: 13,
    marginTop: 5,
  },
  errorText: {
    textAlign: "center",
    width: "100%",
    fontSize: 12,
  },
  textContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    width: "70%",
  },
  inputContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputComponent: {
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "#e8b595",
    maxWidth: '100%',
    width: '60%',
    borderRadius: 10,
  },
  modalInputContainer: {
    flex: 2,
    marginTop: 50,
    alignItems: "center",

  },
  eye: {
    marginTop: 10,
  },
});

export default globalStyles;