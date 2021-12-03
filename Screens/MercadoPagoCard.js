import React from 'react';
import WebViewScreen from '../WebViewScreen/WebViewScreen'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MercadoPagoCard ({navigation, route}) {
    
    const redirectUrl = route.params;
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <WebViewScreen navigation={navigation} redirectUrl={redirectUrl}/>
        </SafeAreaView>
    )
}