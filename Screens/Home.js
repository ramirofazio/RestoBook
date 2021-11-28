import React from 'react';
import { View, StyleSheet } from 'react-native';
import Btn from './Helpers/Btns.js'


export default function Home({ navigation }) {
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View style={styles.btnContainer}>
        <Btn nombre="Ciudad" ruta="#" navigation={navigation} />
        <Btn nombre="Categorias" ruta="#" navigation={navigation} />
        <Btn nombre="DetailsResto" ruta="DetailsResto" navigation={navigation} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 20,
    width: 100,
    height: 50,
  }
});


