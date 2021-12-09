import React,{useState, useRef, useEffect} from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-animatable";
import { WebView } from "react-native-webview";
import WebViewNavigation from "./WebViewNavigation";
import { useSelector } from "react-redux";

export default function WebViewScreen({ route, navigation}){
    const webViewRef = useRef();
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const  [currentUrl, setCurrentUrl] = useState('');
    const eventInfo = useSelector((state) => state)
    const {url} = route.params
    //useEffect consologear la url para ver que tira
    //hacer un useEffect y useState y colocar la URL de la HOME para que la tome todo el tiempo
    //con OnNavigationStateChange evalúa las condiciones de la pantalla actual
    //Webview con OnNavigationStateChange{state{state.url}} pasar un cosole.log(state) para ver si muestra la URL
    //guardar esa URL en un estado local currentUrl y setCurrentUrl y setear el set al state.url del navigationStateChange

    const handleBackPress= () => {
        webViewRef.current.goBack()
    }
    const handleForwardPress=()=> {
        webViewRef.current.goForward()
    }

    // useEffect(() => {
    //     if (currentUrl.includes('/success')) {
    //         // console.log('URL SUCCESS', currentUrl);
    //         let paramsUrl = (new URL(currentUrl)).searchParams;
    //         let payment_id = paramsUrl.get('payment_id');
    //         let payment_status = paramsUrl.get('status');

    //         navigation.navigate('RestoBook');


    //         // const eventInfoDB = {...eventInfo, payment_id, payment_status};
    //         // console.log('FINAL EVENT', eventInfoDB);
            
    //     }
    // }, [currentUrl])

    // Event.create(eventInfoDB)
    //     .then(id=>{
    //         user.addRelation({idMesa: id, userUserUUID: auth.currentUserUser.uid}); // no están declaradas las ID
    //         Alert.alert('Tu mesa ha sido reservada');
    //         navigation.replace('RestoBook');
    //     })
    //     .catch(e=> {
    //         console.log(e);
    //         Alert.alert('Ha ocurrido un error.');
    //         navigation.replace('RestoBook');
    //      }); 

        return(
            <View style={styles.container}>
            <WebView
            ref={webViewRef}
            source={{uri: url}}
            navigation={navigation}
            onNavigationStateChange={state => {
                //console.log("State", state.url)
                const url = state.url;
                setCurrentUrl(url);
                const back = state.canGoBack;
                const forward = state.canGoForward;
                setCanGoBack(back);
                setCanGoForward(forward);
            }}
            > 
            </WebView>
            <WebViewNavigation onBackPress={handleBackPress} onForwardPress={handleForwardPress} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
