import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js';
import 'react-native-gesture-handler';
import Navigator from './routes/Navigator.js';
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Async Storage has been extracted from react-native core"]);

export default function App() {
  // const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <Navigator />

    </Provider >
  );
};
