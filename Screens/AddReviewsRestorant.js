import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input, Button, AirbnbRating, } from "react-native-elements";
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { isEmpty } from "lodash";
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import globalStyles from "./GlobalStyles";

export default function AddReviewsRestorant({ navigation }) {
  const currentUser = useSelector((state) => state.currentUser);
  const empresaDetail = useSelector((state) => state.empresaDetail);
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");
  const [errorReview, setErrorReview] = useState(null);
  const addReview = async () => {
    if (!validForm()) {
      return;
    }
    const newValues = {
      idUser: currentUser.id,
      fotoUser: currentUser.profileImage,
      idResto: empresaDetail.idResto,
      review: review,
      rating: rating,
      createAt: new Date(),
    };

    try {
      let restoRef = doc(firebase.db, "Restos", empresaDetail.idResto);
      await updateDoc(restoRef, {
        reviews: arrayUnion(newValues),
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  const validForm = () => {
    setErrorReview(null);
    let isValue = true;
    if (isEmpty(review)) {
      setErrorReview("Completá tu comentario", 3000);
      isValue = false;
    }
    return isValue;
  };
  return (
    <View style={styles.container}>
        <View>
        <View style={styles.viewRating}>
          <AirbnbRating
            count={5}
            reviews= {["Malo", "Regular", "Normal", "Bueno", "Excelente"]}
            defaultRating={0}
            size={10}
            onFinishRating={(value) => setRating(value)}
          ></AirbnbRating>
        </View>
        <View style={styles.comentarios}>
          <TextInput
            placeholder="  Tu opinion..."
            fontSize={15}
            containerStyle={styles.containerInput}
            style={globalStyles.inputComponent}
            onChange={(e) => setReview(e.nativeEvent.text)}
            errorMessage={errorReview}
          />
        </View>
        {/* <Button
                title="Enviar Comentario"
                containerStyle={styles.containerButon}
                style={globalStyles.btnFiltrosHome}
                onPress={addReview}
                >
            </Button> */}
            <View style={styles.buton}>
             <TouchableOpacity 
                      style={globalStyles.btnFiltrosHome}
                      onPress={addReview}
                      >
                          <Text style={globalStyles.texts}>Escribe una opinion</Text>
                      </TouchableOpacity>
            </View>
            </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2",
    marginTop: 100,
    marginBottom: 2,
  },
  comentarios: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  containerInput: {
    marginBottom: 10,
  },
  input: {
    height: 150,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  buton: {
 padding: 30,
marginTop:20
  },
});
