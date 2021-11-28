import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


//----------IMP SCREENS-----------
import Home from '../Screens/Home'
import AddRestoScreen from '../Screens/RegisterResto.js';
import AddUserScreen from '../Screens/RegisterUser.js';
import AddMenuRestoScreen from '../Screens/menuResto.js'
import DetailsResto from "../Screens/DetailsResto";
import Nav from "../Screens/Nav.js"
import GlobalLogin from "../Screens/GlobalLogin.js";
import LoginResto from "../Screens/LoginResto.js";
import AwaitEmail from "../Screens/AwaitEmail.js";

export default Navigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={"RestoBook"}
                    component={Home}
                    options={({ navigation }) => ({
                        headerTitle: () => <Nav navigation={navigation} title={'Resto Book'} />,
                        headerStyle: {
                            backgroundColor: '#f6efd2'
                        },
                    })}
                />
                <Stack.Screen
                    name="RegisterUser"
                    component={AddUserScreen}
                />
                <Stack.Screen
                    name="RegisterResto"
                    component={AddRestoScreen}
                />
                <Stack.Screen
                    name="MenuResto"
                    component={AddMenuRestoScreen}
                />
                <Stack.Screen
                    name="DetailsResto"
                    component={DetailsResto}
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
