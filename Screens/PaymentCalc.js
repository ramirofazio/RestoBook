import React from "react"
// import WebViewScreen from '../WebViewScreen/WebViewScreen'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from "react-native";
import { View, Text} from "react-native-animatable";
import WebViewScreen from "./WebViewScreen";

export default function PaymentCalc ({navigation, route}) {
    
    const redirectUrl = route.params;
    return (
        <View style={styles.Home}>
            <Text navigation={navigation}>                          Acá tiene que ir Mercado Pago</Text>
            <WebViewScreen />
        </View>
    )
}


const styles = StyleSheet.create({
    Home: {
        flex: 1,
        backgroundColor: '#ffdfcb'
    },
})
