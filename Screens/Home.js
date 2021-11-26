import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        style={styles.btn}
        title="Login"
        onPress={() => navigation.navigate("GlobalLogin")}
      />
      <Button
        style={styles.btn}
        title="Agregar Menu Resto"
        onPress={() => navigation.navigate("Menu Resto")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    height: "10%",
  },
  btn: {},
});
