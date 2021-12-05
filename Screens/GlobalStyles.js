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
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#f6efd3",
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 30,
    borderRadius: 25,
    width: "95%",
    // maxHeight: "15%",
    height: 150
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
  containerImgCard: {
    width: "31.6%",
    maxHeight: '250%',
    // height: '100%',
    backgroundColor: 'pink',
    marginVertical: -25,
    // marginHorizontal: 5,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center"
  },
  cardsHomeimg: {
    backgroundColor: "red",
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  cardsDescriptionContainer: {
    flex: 2,
    backgroundColor: 'green',
    maxHeight: '100%',
    height: '15%',
    width: '33%',
    alignSelf: "center",
    justifyContent: "center"
    
  },
  cardsDescriptionText: {
    textAlign: "center"
  },
  btnContainerCard: {
    backgroundColor: 'violet',
    // maxHeight: '15%',
    height: '50%',
    width: '31.6%',
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: -65
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
    width: '100%'
  },
  wspImage: {
    width: 30,
    height: 30,
    borderRadius: 25
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
});

export default globalStyles;