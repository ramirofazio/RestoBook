//----------REACT UTILS-----------
import React, { useState, useEffect } from "react";
//
//
//----------REDUX UTILS-----------
import { useSelector } from "react-redux";
//
//
//----------REACT-NATIVE UTILS-----------
import { View, Text, TouchableOpacity } from "react-native";
//
//
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, collection, query } from "firebase/firestore";

//
//
//---------SCREENS & COMPONENTS---------------

//
//
//-------ICONS-------

//
//
//-------STYLES-------

//
//
//-------INITIALIZATIONS-------
const auth = getAuth();
//
//---------------------------------------------------------------------------------------//
//

const ProfileResto = ({ navigation }) => {
    const loggedId = useSelector((state) => state.currentId);
    const [availableCommerces, setAvailableCommerces] = useState([]);
    useEffect(() => {
        const q = query(collection(firebase.db, "Restos"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let arr = [];
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj.idResto = doc.id;

                if (obj.id === loggedId) {
                    //console.log("coinciden!");
                    arr.push(obj);
                }
            });
            setAvailableCommerces(arr);
        });
    }, []);

    return (
        <View>
            <Text>Conectado!</Text>
            <TouchableOpacity onPress={() => navigation.navigate("RestoBook")}>
                <Text>Home</Text>
            </TouchableOpacity>
            <Text>Tus comercios: </Text>

            {availableCommerces.length ? (
                <View>
                    {availableCommerces.map((element) => {
                        return (
                            <View>
                                <Text>{element.title}</Text>
                                <Text>{element.Description}</Text>
                            </View>
                        );
                    })}
                </View>
            ) : null}
        </View>
    );
};

export default ProfileResto;