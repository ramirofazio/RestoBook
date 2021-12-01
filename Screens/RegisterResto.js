//Creo que no se puede autenticar un usuario con todos los datos completos. El sign up con mail solo admite mail y password,
// usuario >> se registra como empresa >> le permitimos cargar un local >> ese local tiene menus
//    X           mail y pass             todos los datos de este form    anidamos/linkeamos menu
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, View, TextInput, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import globalStyles from "./GlobalStyles";

//-------FIREBASE--------
import {addDoc,collection} from "firebase/firestore";
import db from "../database/firebase";
//------SCREENS----------
import addEmpresa from "../Redux/Actions/addEmpresa";
import BtnFuncional from './Helpers/BtnFuncional.js';

const RegisterResto = (props) => {
  let dispatch = useDispatch();
  const empresas = useSelector((state) => state.empresas)
  const Id = empresas.length + 1;
  //console.log("soy ID", Id)

  const initalState = {
    // name: "",
    // fantasyName: "",
    // cuit: "",
    // phone: "",
    // phone2: "",
    // email: "",
    // provincia: "",
    // ciudad: "",
    // direction: "",
    // horarios: "",
    Id: Id,
    Title: "",
    Description: "",
    Img: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewResto = () => {
   const ref = addDoc(collection(db, "registroResto"), {
      Id: state.Id,
      Title: state.Title,
      Description: state.Description,
      Img: state.Img,
    });
    dispatch(addEmpresa(state));
    props.navigation.navigate("RestoBook");
  };

  // const saveNewResto = async () => {
  //   if (state.name === "") {
  //     alert("Complete sus datos por favor");
  //   } else {
  //     try {
  //       await firebase.db.collection("usersResto").add({
  //         name: state.name,
  //         fantasyName: state.fantasyName,
  //         cuit: state.cuit,
  //         phone: state.phone,
  //         phone2: state.phone2,
  //         email: state.email,
  //         provincia: state.provincia,
  //         ciudad: state.ciudad,
  //         direction: state.direction,
  //         horarios: state.horarios,
  //       });

  //       props.navigation.navigate("UsersList");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <View style={globalStyles.Home}>
        {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder="Razón social"
            onChangeText={(value) => handleChangeText(value, "name")}
            value={state.name}
          />
        </View> */}

        {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder="Nombre de fantasía"
            onChangeText={(value) => handleChangeText(value, "fantasyName")}
            value={state.fantasyName}
          />
        </View> */}

        {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder="Cuit"
            onChangeText={(value) => handleChangeText(value, "cuit")}
            value={state.cuit}
          />
        </View> */}

        {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder="Teléfono"
            onChangeText={(value) => handleChangeText(value, "phone")}
            value={state.phone}
          />
        </View> */}

        {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder="Teléfono 2"
            onChangeText={(value) => handleChangeText(value, "phone2")}
            value={state.phone2}
          />
        </View> */}

        {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder="Email"
            onChangeText={(value) => handleChangeText(value, "email")}
            value={state.email}
          />
        </View> */}

        {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder="Provincia"
            onChangeText={(value) => handleChangeText(value, "provincia")}
            value={state.provincia}
          />
        </View> */}

        {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder="Ciudad"
            onChangeText={(value) => handleChangeText(value, "ciudad")}
            value={state.ciudad}
          />
        </View> */}

        {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder="Dirección"
            onChangeText={(value) => handleChangeText(value, "direction")}
            value={state.direction}
          />
        </View> */}

        {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder="Horarios"
            onChangeText={(value) => handleChangeText(value, "horarios")}
            value={state.horarios}
          />
        </View> */}
        <View style={globalStyles.inputContainer}>
                  <View style={globalStyles.inputComponent}>
                    <TextInput
                    style={globalStyles.texts}
                      placeholder="Title"
                      onChangeText={(value) => handleChangeText(value, "Title")}
                      value={state.Title}
                    />
                  </View>
                  <View style={globalStyles.inputComponent}>
                    <TextInput
                    style={globalStyles.texts}
                      placeholder="Descripcion"
                      onChangeText={(value) => handleChangeText(value, "Description")}
                      value={state.Description}
                    />
                  </View>
                  <View style={globalStyles.inputComponent}>
                    <TextInput
                    style={globalStyles.texts}
                      placeholder="Image"
                      onChangeText={(value) => handleChangeText(value, "Img")}
                      value={state.Img}
                    />
                  </View>
        </View>
        <View style={globalStyles.container}>
          <TouchableOpacity
            style={globalStyles.touchLog}
            onPress={() => saveNewResto()}
          >
            <Text style={globalStyles.fontLog}>Create</Text>
          </TouchableOpacity>
        </View>
        {/* <View>
          <Button title="Crear" onPress={() => saveNewResto()} />
        </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
});

export default RegisterResto;
