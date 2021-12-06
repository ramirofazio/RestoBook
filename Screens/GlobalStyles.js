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
    backgroundColor: "#f6efd3",
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 25,
    width: "95%",
    maxHeight: "15%",
    // height: '15%'
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
    resizeMode: 'contain' // esta linea es para que se adapte al tam;o de la imagen
  },
  cardsHomeimg: {
    backgroundColor: "red",
    alignItems: 'center',
    alignSelf: "flex-start",
    width: 100,
    height: 100,
    borderRadius: 25,
    marginVertical: -35, //VER COMO ARREGLAR 
  },
  cardsInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: 'skyblue',
    maxWidth: '40%',
    // width: '100%'
  },
  cardsDescriptionContainer: {
    // backgroundColor: "violet",
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
    backgroundColor: "#5555",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    marginTop: -15,
    maxWidth: '40%',
    width: '100%'
  },
  wspImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: 'yellow'
  },
  componentTitle: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 30,
    color: "#392c28"

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
    fontWeight: "bold",
    textAlign: "center"
  },
  btnContainerLogin: {
    flex: 6,
    alignItems: "center",
    maxWidth: '80%',
    width: '100%',
    maxHeight: '70%',
    height: '100%'
  },
  text: {
    textAlign: "center",
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
  },
  modalInputContainer: {
    flex: 2,
    marginTop: 50,
    alignItems: "center",

  },
});

export default globalStyles;