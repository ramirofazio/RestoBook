import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

//----------IMP SCREENS-----------
import Home from './Screens/Home.js'
import AddRestoScreen from './Screens/RegisterResto.js';
import AddUserScreen from './Screens/RegisterUser.js';
import AddMenuRestoScreen from './Screens/menuResto.js'
import Nav from "./Screens/Nav.js"

//-----------HELPERS-----------
import Btn from "./Screens/Helpers/Btns.js";

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={"Resto Book"}
            component={Home}
            options={({ navigation }) => ({
              headerTitle: () => <Nav title="Resto Book" navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Register User"
            component={AddUserScreen}
          />
          <Stack.Screen
            name="Register Resto"
            component={AddRestoScreen}
          />
          <Stack.Screen
            name="Menu Resto"
            component={AddMenuRestoScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );


}

const styles = StyleSheet.create({


});
