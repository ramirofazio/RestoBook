import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.js";
import "react-native-gesture-handler";
import Navigator from "./routes/Navigator.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

export default function App() {
  // const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
