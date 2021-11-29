import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//----------IMP SCREENS-----------
import Home from '../Screens/Home'
import RegisterResto from '../Screens/RegisterResto.js';
import AddUserScreen from '../Screens/RegisterUser.js';
import AddMenuResto from '../Screens/AddMenuResto.js'
import DetailsResto from "../Screens/DetailsResto";
import GlobalLogin from "../Screens/GlobalLogin.js";
import LoginResto from "../Screens/LoginResto.js";
import AwaitEmail from "../Screens/AwaitEmail.js";
import NavHome from "../Screens/NavHome.js"
import NavDetail from "../Screens/NavDetail";
import { useSelector } from "react-redux";

export default Navigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={"RestoBook"}
          component={Home}
          options={({ navigation }) => ({
            headerTitle: () => <NavHome navigation={navigation} title={'Resto Book'} />,
            headerStyle: {
              backgroundColor: '#f6efd2',
            },
          })}
        />
        <Stack.Screen
          name="RegisterUser"
          component={AddUserScreen}
        />
        <Stack.Screen
          name="RegisterResto"
          component={RegisterResto}
        />
        <Stack.Screen
          name="AddMenuResto"
          component={AddMenuResto}
        />
        <Stack.Screen
          name="DetailsResto"
          component={DetailsResto}
          options={({ navigation }) => ({
            headerTitle: () => <NavDetail navigation={navigation} />,
            headerStyle: {
              backgroundColor: '#f6efd2',
            },
          })}
        />
        <Stack.Screen
          name="GlobalLogin"
          component={GlobalLogin}
        />
        <Stack.Screen
          name="LoginResto"
          component={LoginResto}
        />
        <Stack.Screen
          name="AwaitEmail"
          component={AwaitEmail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
