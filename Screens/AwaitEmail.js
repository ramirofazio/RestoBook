//----------REACT UTILS-----------
import React from "react";
//
//
//----------REDUX UTILS-----------
import { useDispatch } from "react-redux";
import CurrentId from "../Redux/Actions/CurrentId.js";
import CurrentUser from "../Redux/Actions/CurrentUser.js";
//
//
//----------REACT-NATIVE UTILS-----------
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
//
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase.js";
import { getAuth, signOut } from "firebase/auth";
//
//
//---------SCREENS & COMPONENTS---------------
//
//
//-------STYLES-------
import globalStyles from "./GlobalStyles.js";
import { Divider } from "react-native-elements";

//
//
//-------INITIALIZATIONS-------
const auth = getAuth();
// import { Alert } from 'antd'; PREGUNTAR A LAI Y LUCAS G O BORRAR :)
//
//---------------------------------------------------------------------------------------//
//
const AwaitEmail = ({ navigation }) => {
  const dispatch = useDispatch();
  const signOutAndClearRedux = () => {
    signOut(auth);
    dispatch(CurrentUser(null));
    dispatch(CurrentId(null));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F2f2f2",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Text style={globalStyles.text}>
        Te enviamos un email de confirmación de cuenta, si no lo encuentras en tu bandeja de entrada puede estar en Spam.
        Si aún no lo recibes, por favor clickeá en "Reenviar"
      </Text>
      <Divider  orientation="horizontal"
          width={2}
          inset={true}
          insetType={"center"}
          style={{marginTop: 15}}
          color={"rgba(22, 22, 22, .2)"}
          />
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={globalStyles.btnFiltrosHome}
          onPress={() => {
            firebase.fireAuth.currentUser.sendEmailVerification();
            alert("Mail enviado, chequea en Spam!");
          }}
        >
          <Text style={globalStyles.texts}>Reenviar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.btnFiltrosHome}
          onPress={() => {
            signOutAndClearRedux();
            navigation.navigate("GlobalLogin");
          }}
        >
          <Text style={globalStyles.texts}>Volver a Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AwaitEmail;
