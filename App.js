import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.js";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//----------IMP SCREENS-----------
import Home from "./Screens/Home.js";
import AddRestoScreen from "./Screens/RegisterResto.js";
import GlobalLogin from "./Screens/GlobalLogin.js";
import AddMenuRestoScreen from "./Screens/menuResto.js";
import LoginResto from "./Screens/LoginResto.js";
import AwaitEmail from "./Screens/AwaitEmail.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GlobalLogin" component={GlobalLogin} />
          <Stack.Screen name="Register Resto" component={AddRestoScreen} />
          <Stack.Screen name="Menu Resto" component={AddMenuRestoScreen} />

          <Stack.Screen name="LoginResto" component={LoginResto} />
          <Stack.Screen name="AwaitEmail" component={AwaitEmail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
