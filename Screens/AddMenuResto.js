//----------REACT UTILS-----------
import React, { useState } from "react";
//
//----------REDUX UTILS-----------
import { useSelector } from "react-redux";
//
//----------REACT-NATIVE UTILS-----------
import { View, TextInput, TouchableOpacity, Text, Image, Pressable } from "react-native";
import { BottomSheet, ListItem } from "react-native-elements";
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
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
  const [isVisible, setIsVisible] = useState(false);
  const [category, setCategory] = useState();
  const categories = useSelector((state) => state.categoriesMenu);


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
    }
  };

  return (
    <View style={globalStyles.Home}>
      <View style={globalStyles.inputComponent}>
        <Pressable onPress={ () => setIsVisible(true) }>
          <TextInput
            style={globalStyles.texts}
            editable={false}
            placeholder="Seleccionar Categoria"
            value={category}
            onPressIn={() => setIsVisible(true)}
          />
        </Pressable>
        <BottomSheet
          isVisible={isVisible}
          containerStyle={{ backgroundColor: '#333a' }}
        >
          {categories.map((categoria, index) => (
            <ListItem
              key={index}
              containerStyle={{ backgroundColor: 'rgba(0.5,0.25,0,0.7)' }}
              style={{ borderBottomWidth: 1, borderColor: '#333a', backgroundColor: "#fff0" }}
              onPress={() => {
                setCategory(categoria)
                setIsVisible(false)
              }}
            >
              <ListItem.Content
                style={{ backgroundColor: "#0000", alignItems: "center" }}
              >
                <ListItem.Title
                  style={{ height: 35, color: '#fff', padding: 8 }}
                >
                  {categoria}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
          <ListItem
            key={999}
            containerStyle={{ backgroundColor: '#d14545' }}
            style={{ borderBottomWidth: 1, borderColor: '#333a' }}
            onPress={() => setIsVisible(false)}
          >
            <ListItem.Content style={{ alignItems: "center" }}>
              <ListItem.Title
                style={{ height: 35, color: '#FFF', padding: 8, fontSize: 20 }}
              >
                Cancelar
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </BottomSheet>
      </View>

      <Formik
        initialValues={{
          foodName: "",
          description: "",
          price: "",
          category: "",
          img: "",
        }}
        validationSchema={MenuRestoSchema}
        onSubmit={async (values) => {
          const newValues = {
            foodName: values.foodName.toLowerCase(),
            description: values.description.toLowerCase(),
            price: values.price,
            category: category.toLowerCase(),
            img: values.img
          }
          try {
            let restoRef = doc(firebase.db, "Restos", idResto);
            setSpinner(true);
            await updateDoc(restoRef, {
              menu: arrayUnion(newValues),
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
                placeholder="Titulo"
                onChangeText={props.handleChange("foodName")}
                value={props.values.foodName}
                onBlur={props.handleBlur("foodName")}
              />
            </View>
            {props.touched.foodName && props.errors.foodName ? (
              <Text style={globalStyles.errorText}>{props.errors.foodName}</Text>
            ) : null}
            <View style={globalStyles.inputComponent}>
              <TextInput
                multiline
                style={globalStyles.texts}
                placeholder="Decripcion"
                onChangeText={props.handleChange("description")}
                value={props.values.description}
                onBlur={props.handleBlur("description")}
              />
            </View>
            {props.touched.description && props.errors.description ? (
              <Text style={globalStyles.errorText}>{props.errors.description}</Text>
            ) : null}
            <View style={globalStyles.inputComponent}>
              <TextInput
                style={globalStyles.texts}
                placeholder="Precio"
                onChangeText={props.handleChange("price")}
                value={props.values.price}
                keyboardType="numeric"
                onBlur={props.handleBlur("price")}
              />
            </View>

            {props.touched.price && props.errors.price ? (
              <Text style={globalStyles.errorText}>{props.errors.price}</Text>
            ) : null}
            <TouchableOpacity
              style={globalStyles.btnTodasComidas}
              onPress={() => {
                handleOnPressPickImage(props.handleChange("img"));
              }}
            >
              <Text style={globalStyles.texts}>
                {props.values.img && props.values.img.length > 0
                  ? "Cambiar Imagen"
                  : "Seleccionar Imagen"}
              </Text>
            </TouchableOpacity>
            {props.values.img && props.values.img.length > 0 ? (
              <Image
                source={{ uri: props.values.img }}
                style={{ width: 200, height: 200, borderRadius: 15 }}
              />
            ) : null}
            <View style={globalStyles.btnTodasComidas}>
              <TouchableOpacity
                
                onPress={() => props.handleSubmit()}
              >
                <Text style={globalStyles.texts}>Agregar!</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View >
  );
};

export default AddMenuResto;
