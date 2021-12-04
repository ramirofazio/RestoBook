// import React, { useRef, useState, useEffect } from "react";
// import { View, Alert } from 'react-native';
// import { useSelector } from "react-redux";
// import { WebView } from 'react-native-webview';
// import WVSNavigation from "../../common/components/WVSNavigation/WVSNavigation";



// export default function WebViewScreen ({navigation, redirectUrl}) {
//     const eventInfo = useSelector((state) => state.eventForm);
//     const webViewRef = useRef();

//     const [canGoBack, setCanGoBack] = useState(false);
//     const [canGoForward, setCanGoForward] = useState(false);
//     const [currentUrl, setCurrentUrl] = useState('');
//     const [showSpinner, setShowSpinner] = useState(false)

//     const handleBackPress = () => {
//         webViewRef.current.goBack();
//     }

//     const handleForwardPress = () => {
//         webViewRef.current.goForward();
//     }

//     const handleShowSpinner = ()=> {
//         setShowSpinner(true)    
//     }
//     const hideSpinner = () => {
//         setShowSpinner(false)
//     }
 
//     useEffect(() => {
//         if (currentUrl.includes('/success')) {
//             // console.log('URL SUCCESS', currentUrl);
//             let paramsUrl = (new URL(currentUrl)).searchParams;
//             let payment_id = paramsUrl.get('payment_id');
//             let payment_status = paramsUrl.get('status');

//             const eventInfoDB = {...eventInfo, payment_id, payment_status};
//             // console.log('FINAL EVENT', eventInfoDB);
            
//             Event.create(eventInfoDB)
//                 .then(id=>{
//                     user.addRelation('events', 'created', {eventUUID: id, userUUID: auth.currentUser.uid})
//                     Alert.alert('Tu evento ha sido creado', 'Te enviamos un email con la información.');
//                     navigation.replace('TabBar', currentUrl);
//                 })
//                 .catch(e=> {
//                     console.log(e);
//                     Alert.alert('Ha ocurrido un error.');
//                     navigation.replace('TabBar', currentUrl);
//                 }); 
//         }
//         if (currentUrl.includes('/cancel')) {
//             // console.log('URL FAILURE', currentUrl);
//             Alert.alert('El pago ha sido rechazado.');
//             navigation.replace('TabBar', currentUrl);
//         }
//     }, [currentUrl, eventInfo, Event, user]);

//     return (
//         <View style={{flex: 1, resizeMode: 'contain'}}>
//             <Spinner 
//             visible={showSpinner}
//             textContent={"Cargando..."}
//             textStyle={{color: "#000000"}}
//             />
//             <WebView 
//                 ref={webViewRef}
//                 style={{width: '100%', height: '100%', alignSelf: 'center'}}
//                 source={{ uri: redirectUrl }} 
//                 onNavigationStateChange={state => {
//                     // console.log('STATE', state.url);
//                     const url = state.url;
//                     setCurrentUrl(url);
//                     const back = state.canGoBack;
//                     const forward = state.canGoForward;
//                     setCanGoBack(back);
//                     setCanGoForward(forward);
//                 }}
//                 onLoadStart={() => handleShowSpinner()}
//                 onLoad={() => hideSpinner()}
//             />
//             <WVSNavigation 
//                 onBackPress={handleBackPress} 
//                 onForwardPress={handleForwardPress}
//             />
//         </View>
//     )
// }

import React,{useState, useRef} from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-animatable";
import {WebView} from "react-native-webview";
import WebViewNavigation from "./WebViewNavigation";

export default function WebViewScreen({navigation}){
const webViewRef = useRef();
const [canGoBack, setCanGoBack] = useState(false);
const [canGoForward, setCanGoForward] = useState(false);

const handleBackPress= () => {
    webViewRef.current.goBack()
}
const handleForwardPress=()=> {
    webViewRef.current.goForward()
}
     return(
        <View style={styles.container}>
            <WebView
            ref={webViewRef}
            source={{uri: 'https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1031166001-2ccf0a1f-91b0-4de6-b44c-328d35e37c11'}}
            navigation={navigation}
            onNavigationStateChange={state => {
                const back = state.canGoBack;
                const forward = state.canGoForward;
                setCanGoBack(back);
                setCanGoForward(forward);
            }}
            > 
            </WebView>
            <WebViewNavigation onBackPress={handleBackPress} onForwardPress={handleForwardPress}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex:1,
    },
})