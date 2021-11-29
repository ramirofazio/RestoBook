//Creo que no se puede autenticar un usuario con todos los datos completos. El sign up con mail solo admite mail y password,
// usuario >> se registra como empresa >> le permitimos cargar un local >> ese local tiene menus
//    X           mail y pass             todos los datos de este form    anidamos/linkeamos menu
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, View, TextInput, ScrollView, StyleSheet } from "react-native";

//-------FIREBASE--------
import firebase from "../database/firebase";

//------SCREENS----------
import { addEmpresa } from "../Redux/Actions/addEmpresa";
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
    <ScrollView style={styles.container}>
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
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Title"
          onChangeText={(value) => handleChangeText(value, "Title")}
          value={state.Title}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Descripcion"
          onChangeText={(value) => handleChangeText(value, "Description")}
          value={state.Description}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Image"
          onChangeText={(value) => handleChangeText(value, "Img")}
          value={state.Img}
        />
      </View>

      <View>
        <Button title="Crear" onPress={() => saveNewResto()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RegisterResto;
