import React, { useState, useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-animatable";
import { WebView } from "react-native-webview";
import WebViewNavigation from "./WebViewNavigation";
import { useSelector } from "react-redux";
import emailjs from "emailjs-com";
//--------------FIREBASE-----------------------//
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "../database/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
//-------INITIALIZATIONS-------
const auth = getAuth();

export default function WebViewScreen({ route, navigation }) {
  const didMountRef = useRef(false);
  const webViewRef = useRef();
  const { url } = route.params;
  const [currentUrl, setCurrentUrl] = useState(url);
  const [currentUser, setCurrentUser] = useState({});
  const [reserva, setReserva] = useState({});
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const empresaDetail = useSelector((state) => state.empresaDetail);
  //useEffect consologear la url para ver que tira
  //hacer un useEffect y useState y colocar la URL de la HOME para que la tome todo el tiempo
  //con OnNavigationStateChange evalúa las condiciones de la pantalla actual
  //Webview con OnNavigationStateChange{state{state.url}} pasar un cosole.log(state) para ver si muestra la URL
  //guardar esa URL en un estado local currentUrl y setCurrentUrl y setear el set al state.url del navigationStateChange
  const getInfo = async () => {
    if (currentUrl.includes("/approved")) {
      try {
        const reservaId = currentUrl.split("=");
        console.log(reservaId);
        console.log(reservaId[1]);
        // let payment_status = paramsUrl.get('status');
        const newreserva = {
          idReserva: reservaId[1],
          statusReserva: "approved",
        };
        setReserva(newreserva);
        const docRef = doc(firebase.db, "Users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let obj = docSnap.data();
          setCurrentUser(obj);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const sendEmail = () => {
    console.log("Entro a sendEmail");
    console.log("reserva dentro de sendEmail: ", reserva);
    const templateParams = {
      subject: `Tu reserva en ${empresaDetail.title} fue confirmada`,
      name: currentUser.name,
      restoName: empresaDetail.title,
      message: "Reserva confirmada probando",
      email: currentUser.email,
      idReserva: "reserva.idReserva",
    };
    emailjs
      .send(
        "service_w5zryen",
        "template_zwe6qen",
        templateParams,
        "user_IEK9t1hQIR3ugtExEH6BG"
      )
      .then(
        function (response) {
          console.log(
            `SUCCESS! Email enviado a ${currentUser.email}`,
            response.status,
            response.text
          );
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );

    setTimeout(() => {
      // console.log('URL SUCCESS', currentUrl);
      navigation.navigate("RestoBook");
      alert(
        "Te enviamos un mail con la confirmacion y datos de tu Reserva, muchas gracias !"
      );
    }, 5100);
  };
  const reservaToDB = async () => {
    console.log("currentUser: ", currentUser);
    console.log("reserva dentro de reserva ToDB : ", reserva);
    const reservation = {
      idReserva: reserva.idReserva,
      statusReserva: reserva.statusReserva,
      emailUser: currentUser.email,
      idUser: currentUser.id,
      nameResto: empresaDetail.title,
      idResto: empresaDetail.idResto,
    };
    try {
      let userRef = doc(firebase.db, "Users", currentUser.id);
      await updateDoc(userRef, {
        reservations: arrayUnion(reservation),
      });
      console.log(
        `Reserva en Resto: ${empresaDetail.title}, con id: ${reservation.idReserva} para el usuario ${currentUser.name}`
      );
    } catch (err) {
      console.log(err);
    }
    try {
      let restoRef = doc(firebase.db, "Restos", empresaDetail.idResto);
      await updateDoc(restoRef, {
        reservations: arrayUnion(reservation),
      });
      console.log(
        `Reserva actualizada en User: ${currentUser.name}, con id: ${reservation.idReserva}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleBackPress = () => {
    webViewRef.current.goBack();
  };
  const handleForwardPress = () => {
    webViewRef.current.goForward();
  };
  useEffect(() => {
    if (didMountRef.current) {
      sendEmail();
      reservaToDB();
    }
  }, [currentUser]);

  useEffect(() => {
    if (didMountRef.current) {
      console.log("entro con didMountRef en true");
      getInfo();
    } else {
      didMountRef.current = true;
    }
  }, [currentUrl]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        navigation={navigation}
        onNavigationStateChange={(state) => {
          const url = state.url;
          setCurrentUrl(url);
          const back = state.canGoBack;
          const forward = state.canGoForward;
          setCanGoBack(back);
          setCanGoForward(forward);
        }}
      ></WebView>
      <WebViewNavigation
        onBackPress={() => handleBackPress()}
        onForwardPress={() => handleForwardPress()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
