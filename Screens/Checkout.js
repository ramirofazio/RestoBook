// import React, { useEffect } from "react"
// import { View, Text } from "react-native"
// import { WebView } from "react-native-webview"

// const mercadopago =  

// export default function Checkout() {
//      useEffect(()=>{
//         async function sendServer(){
//              let response = await fetch()
//          }
//      })
//     // // Crea un objeto de preferencia
//     //  let preference = {
//     //       items:[{
//     //          title: 'Mesa reservada',
//     //          quantity: 1,
//     //          unit_price: 10,
//     //          currency_id:'ARG'
//     //         }],
//     //        payer :{
//     //            email: "demo@mail.com"
//     //        },
//     //        preference_methods:{
//     //              installments: 3
//     //            }
//     //        }
//     //         mercadopago.preferences.create(preference).then(function(data){
//     //          console.log(data)
//     //         }).catch(function(error){
//     //          console.log(error)
//     //       })
//          return(
//            <View>
//          <Text> Mercado Pago </Text>
//            </View>
//          )

//     }


import React from 'react';
// import WebViewScreen from '../WebViewScreen/WebViewScreen'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MercadoPagoCard ({navigation, route}) {
    
    const redirectUrl = route.params;
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <WebViewScreen navigation={navigation} redirectUrl={redirectUrl}/>
        </SafeAreaView>
    )
}