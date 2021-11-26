import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { DetailsResto } from "../Screens/DetailsResto";
import Home from '../Screens/Home';

const Navigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='DetailsResto' component={DetailsResto} options={{ title: 'Overview'}}/>
                <Stack.Screen name='Home' component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator; 