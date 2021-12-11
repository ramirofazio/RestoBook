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
    <View>
      <Text>Tus locales:</Text>
      {commerces.map((resto) => {
        return (
          <View key={resto.id}>
            <TouchableOpacity
              key={resto.id}
              onPress={() => {
                dispatch(getCommerceInfo(resto.id));

                navigation.navigate("ProfileResto");
              }}
            >
              <Text>{resto.title}</Text>
              <Text>{resto.address}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default SelectCommerce;
