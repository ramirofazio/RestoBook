import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Btn from './Helpers/Btns.js'
import globalStyles from './GlobalStyles.js';
import CardHome from '../components/CardHome.js'
import BtnFuncional from './Helpers/BtnFuncional.js';
import { NavigationHelpersContext } from '@react-navigation/core';

export default function Home({ navigation }) {

  const Restos = [
    {
      Id: 1,
      Title: "McDonald's",
      Description: "McDonald's es una franquicia de restaurantes de comida rápida estadounidense con sede en Chicago, Illinois.​ Sus principales productos son las hamburguesas, las patatas fritas, los menús para el desayuno y los refrescos. ",
      Img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    },
    {
      Id: 2,
      Title: "Los pollos Hermanos",
      Description: "Los Pollos Hermanos es un restaurante de comida rápida de pollo frito que se originó en las series de televisión Breaking Bad y Better Call Saul.",
      Img: "https://blog-eeuu.com/wp-content/uploads/2018/08/breaking-bad-logo.jpeg",
    },
    {
      Id: 3,
      Title: "Burger King",
      Description: "Burger King, también conocida como BK, ​ es una cadena de establecimientos de comida rápida estadounidense con sede central en Miami, Florida, fundada por James McLamore y David Edgerton, presente a nivel internacional y especializada principalmente en la elaboración de hamburguesas.",
      Img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/800px-Burger_King_2020.svg.png",
    }

  ]

  return (
    <ScrollView style={globalStyles.Home}>

      <View style={globalStyles.btnHome}>
        {/* <Btn nombre="Ciudad" ruta="#" navigation={navigation} /> */}
        {/* <Btn nombre='Buscar' ruta='#' navigation={navigation} /> */}
        {/* <Btn nombre="Categorias" ruta="#" navigation={navigation} /> */}
        <Btn nombre="Register Resto" ruta="RegisterResto" navigation={navigation} />

      </View>

      <ScrollView style={{ overflow: "scroll" }}>
        {Restos.map(resto => {
          return (
            <CardHome key={resto.Id} resto={resto} navigation={navigation}> </CardHome>
          )
        }
        )}
      </ScrollView>

    </ScrollView>
  )
}




