import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


//----------IMP SCREENS-----------
import Home from '../Screens/Home'
import AddRestoScreen from '../Screens/RegisterResto.js';
import AddUserScreen from '../Screens/RegisterUser.js';
import AddMenuRestoScreen from '../Screens/menuResto.js'
import { DetailsResto } from "../Screens/DetailsResto";
import Nav from "../Screens/Nav.js"

export default Navigator = () => {
    const Stack = createNativeStackNavigator();
    return (
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
                <Stack.Screen
                    name="detailsResto"
                    component={DetailsResto}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
