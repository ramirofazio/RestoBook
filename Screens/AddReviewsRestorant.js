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
import { Card } from "react-native-elements/dist/card/Card";
import { Formik } from "formik";
import * as yup from 'yup'

const reviewSchema = yup.object({
  review: yup
    .string()
    .required()
    .min(5)
    .max(25)
})

export default function AddReviewsRestorant({ navigation, route }) {
  const { nameResto } = route.params
  const [rating, setRating] = useState()
  const currentUser = useSelector((state) => state.currentUser);
  const empresaDetail = useSelector((state) => state.empresaDetail);
  const [errorReview, setErrorReview] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={{
        color: "#000",
        textAlign: "center",
        width: "100%",
        fontSize: 25,
        fontWeight: "bold",
        // marginBottom: -10,
        paddingVertical: 1,
      }}>{nameResto}</Text>

      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          reviews={["Malo", "Regular", "Normal", "Bueno", "Excelente"]}
          defaultRating={0}
          size={15}
          onFinishRating={(value) => setRating(value)}
        ></AirbnbRating>
      </View>

      <Formik
        initialValues={{
          review: "",
        }}
        validationSchema={reviewSchema}
        onSubmit={async (values) => {
          const newValues = {
            idUser: currentUser.id,
            fotoUser: currentUser.profileImage,
            idResto: empresaDetail.idResto,
            review: values.review,
            rating: rating,
            createAt: new Date(),
          };

          try {
            console.log("New Values =>", newValues)
            let restoRef = doc(firebase.db, "Restos", empresaDetail.idResto);
            await updateDoc(restoRef, {
              reviews: arrayUnion(newValues),
            });
            navigation.goBack();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {(props) => (
          <View>
            <TextInput
              value={props.values.review}
              placeholder="  Tu opinion..."
              placeholderTextColor="#666"
              textAlign="center"
              fontSize={15}
              containerStyle={styles.containerInput}
              style={globalStyles.inputComponent}
              onChange={props.handleChange("review")}
              onBlur={props.handleBlur("review")}
            />
            {props.touched.review && props.errors.review ? (
              <Text style={globalStyles.errorText}>{props.errors.review}</Text>
            ) : null}
            <TouchableOpacity
              style={globalStyles.btnFiltrosHome}
              onPress={() => props.handleSubmit()}
            >
              <Text style={globalStyles.texts}>Escribe una opinion</Text>
            </TouchableOpacity>
          </View>

        )}

      </Formik>
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
  containerInput: {
  },
  input: {
  },
  buton: {
    padding: 30,
    marginTop: 20
  },
});
