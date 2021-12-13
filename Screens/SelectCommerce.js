//----------REACT UTILS-----------
import React, { useState, useEffect } from "react";
//
//
//----------REDUX UTILS-----------
import { useDispatch, useSelector } from "react-redux";
import CurrentId from "../Redux/Actions/CurrentId.js";
import CurrentUser from "../Redux/Actions/CurrentUser.js";
import UserFavourites from "../Redux/Actions/userFavourites.js";
import getCommerceInfo from "../Redux/Actions/getCommerceInfo.js";
//
//
//----------REACT-NATIVE UTILS-----------
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Divider, Icon } from "react-native-elements";
import UserOutlined from "react-native-vector-icons/AntDesign";
import RestOutlined from "react-native-vector-icons/AntDesign";
//
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
//
//
//---------SCREENS & COMPONENTS---------------
import Btn from "./Helpers/Btns.js";
//
//
//-------STYLES-------
import globalStyles from "./GlobalStyles.js";

//
//
//-------INITIALIZATIONS-------

const auth = getAuth();

const SelectCommerce = ({ navigation }) => {
  const [commerces, setCommerces] = useState([]);
  const currentId = useSelector((state) => state.currentId);
  const dispatch = useDispatch();
  useEffect(() => {
    const getInfo = async () => {
      const q = query(
        collection(firebase.db, "Restos"),
        where("idUser", "==", currentId)
      );

      const querySnapshot = await getDocs(q);
      let arr = [];
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        let infoCard = {
          id: doc.id,
          idUser: obj.idUser,
          title: obj.title,
          address: obj.location.address.split(",")[0],
        };
        arr.push(infoCard);
      });
      setCommerces(arr);
    };
    getInfo();
  }, []);

  return (
    <View style={globalStyles.textContainer}>
      <TouchableOpacity style={globalStyles.btnLogin} onPress={() => alert('Deja crear otro resto')}>
        <Text style={globalStyles.texts}>Agregar sucursal</Text>
      </TouchableOpacity>
      <Icon name='home' type="font-awesome-5" color='#161616'/>
      <Text
          style={{
            fontSize: 25,
            color: "#161616",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          {" "}
           Elegir sucursal:
        </Text>
        <Divider
          orientation="horizontal"
          width={2}
          inset={true}
          insetType={"middle"}
          color={"rgba(00, 00, 00, .5)"}
          style={{ marginVertical: 10 }}
        />
      {commerces.map((resto) => {
        return (
          <View key={resto.id}>
            <TouchableOpacity
              key={resto.id}
              style={{
                marginVertical: 7,
                width: "80%",
                height: 50,
                alignSelf: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#eccdaa",
                backgroundColor: "#f2f2f2",
                borderRadius: 25,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 4.84,
            
                elevation: 5,
              }}
              onPress={() => {
                dispatch(getCommerceInfo(resto.id));

                navigation.navigate("ProfileResto");
              }}
            >
              <Text style={globalStyles.texts}>{resto.title}</Text>
              <Text style={globalStyles.texts}>{resto.address}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default SelectCommerce;
