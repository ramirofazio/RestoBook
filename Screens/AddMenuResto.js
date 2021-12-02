//----------REACT UTILS-----------
import React, { useEffect, useState } from "react";
//
//----------REDUX UTILS-----------
import { useDispatch, useSelector } from "react-redux";
import AddMenu from "../Redux/Actions/AddMenu";
//
//----------REACT-NATIVE UTILS-----------
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
//
//---------SCREENS & COMPONENTS---------------

//
//-------STYLES-------
import globalStyles from "./GlobalStyles";
//
//-------INITIALIZATIONS-------

//
//-------FORMIK------------
import { Formik } from "formik";
//
//-------IMAGE PICKER----------
import * as ImagePicker from "expo-image-picker";
//
//-------YUP(Validacion)------
import * as yup from "yup";
//
//---------------------------------------------------------------------------------------//
//

const MenuRestoSchema = yup.object({
  foodName: yup.string().required().min(3).max(25),
  description: yup.string().required().min(5).max(60),
  price: yup.number().required().positive().integer().max(2000),
});

const AddMenuResto = ({ navigation }) => {
  const empresaDetail = useSelector((state) => state.empresaDetail);
  const [spinner, setSpinner] = useState(false);
  const idResto = empresaDetail.idResto;

<<<<<<< HEAD
  const initalState = {
    foodName: "",
    description: "",
    price: "",
    img: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveMenuResto = async () => {
    try {
      let restoRef = doc(firebase.db, "Restos", idResto);
      await updateDoc(restoRef, {
        menu: arrayUnion(state)
      })
      navigation.navigate("DetailsResto");
    } catch (err) {
      console.log(err);
=======
  const handleOnPressPickImage = async (handleChange) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        handleChange(result.uri);
      }
    } else {
      alert("Sorry, we need camera roll permissions to make this work!");
>>>>>>> origin/Develop
    }
  };

  return (
    <View style={globalStyles.Home}>
<<<<<<< HEAD
      <View style={globalStyles.inputContainer}>
        <View style={globalStyles.inputComponent}>
          <TextInput
            style={globalStyles.texts}
            placeholder="Food Name"
            onChangeText={(value) => handleChangeText(value, "foodName")}
            value={state.foodName}
          />
        </View>
        <View style={globalStyles.inputComponent}>
          <TextInput
            style={globalStyles.texts}
            placeholder="Description"
            onChangeText={(value) => handleChangeText(value, "description")}
            value={state.description}
          />
        </View>
        <View style={globalStyles.inputComponent}>
          <TextInput
            style={globalStyles.texts}
            placeholder="Price"
            onChangeText={(value) => handleChangeText(value, "price")}
            value={state.price}
          />
        </View>
        <View style={globalStyles.inputComponent}>
          <TextInput
            style={globalStyles.texts}
            placeholder="Image"
            onChangeText={(value) => handleChangeText(value, "img")}
            value={state.img}
          />
        </View>
      </View>
      <View style={globalStyles.container}>
        {/* <Button title="Add Food" onPress={() => saveMenuResto()} /> */}
        <TouchableOpacity
          style={globalStyles.touchLog}
          onPress={() => saveMenuResto()}
        >
          <Text style={globalStyles.fontLog}>Add Food</Text>
        </TouchableOpacity>
      </View>
=======
      <Formik
        initialValues={{
          foodName: "",
          description: "",
          price: "",
          img: "",
        }}
        validationSchema={MenuRestoSchema}
        onSubmit={async (values) => {
          try {
            let restoRef = doc(firebase.db, "Restos", idResto);
            setSpinner(true);
            await updateDoc(restoRef, {
              menu: arrayUnion(values),
            });
            setSpinner(false);
            navigation.navigate("DetailsResto");
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {(props) => (
          <View style={globalStyles.inputContainer}>
            <View style={globalStyles.inputComponent}>
              <TextInput
                style={globalStyles.texts}
                placeholder="Food Name"
                onChangeText={props.handleChange("foodName")}
                value={props.values.foodName}
                onBlur={props.handleBlur("foodName")}
              />
            </View>
            {props.touched.foodName && props.errors.foodName ? (
              <Text>{props.errors.foodName}</Text>
            ) : null}
            <View style={globalStyles.inputComponent}>
              <TextInput
                multiline
                style={globalStyles.texts}
                placeholder="description"
                onChangeText={props.handleChange("description")}
                value={props.values.description}
                onBlur={props.handleBlur("description")}
              />
            </View>
            {props.touched.description && props.errors.description ? (
              <Text>{props.errors.description}</Text>
            ) : null}
            <View style={globalStyles.inputComponent}>
              <TextInput
                style={globalStyles.texts}
                placeholder="price"
                onChangeText={props.handleChange("price")}
                value={props.values.price}
                keyboardType="numeric"
                onBlur={props.handleBlur("price")}
              />
            </View>
            {props.touched.price && props.errors.price ? (
              <Text>{props.errors.price}</Text>
            ) : null}
            <TouchableOpacity
              style={globalStyles.touchLog}
              onPress={() => {
                handleOnPressPickImage(props.handleChange("img"));
              }}
            >
              <Text style={{ textAlign: "center" }}>
                {props.values.img && props.values.img.length > 0
                  ? "Change Image"
                  : "Select Image"}
              </Text>
            </TouchableOpacity>
            {props.values.img && props.values.img.length > 0 ? (
              <Image
                source={{ uri: props.values.img }}
                style={{ width: 200, height: 200, borderRadius: 15 }}
              />
            ) : null}
            <View>
              <TouchableOpacity
                style={globalStyles.touchLog}
                onPress={() => props.handleSubmit()}
              >
                <Text style={globalStyles.fontLog}>Add Food</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
>>>>>>> origin/Develop
    </View>
  );
};

export default AddMenuResto;
