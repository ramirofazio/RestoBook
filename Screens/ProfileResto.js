//----------REACT UTILS-----------
import React, { useState, useEffect } from "react";
//
//
//----------REDUX UTILS-----------
import { useSelector } from "react-redux";
//
//
//----------REACT-NATIVE UTILS-----------
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Animated,
    useWindowDimensions,
    Alert,
    Modal,
    ActivityIndicator,
    ScrollView,
  } from "react-native";
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
import globalStyles from "./GlobalStyles";
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
    const [image, setImage] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState({});


    useEffect(() => {
        const q = query(collection(firebase.db, "Restos"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let arr = [];
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                // console.log(obj)
                setImage(obj.profileImage);
                setCurrentUser(obj);
                setNewUserInfo(obj);
                obj.idResto = doc.id;

                if (obj.id === loggedId) {
                    //console.log("coinciden!");
                    arr.push(obj);
                }
            });
            setAvailableCommerces(arr);
        });
    }, []);
    
      let openImagePickerAsync = async () => {
        setUploading(true);
        let permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          alert("Se necesita el permiso para acceder a la galería!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          base64: true,
        });
    
        if (pickerResult.cancelled === true) {
          setUploading(false);
          return;
        }
    
        let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;
    
        let data = {
          file: base64Img,
          upload_preset: "restohenry",
        };
    
        fetch(CLOUDINARY_URL, {
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
        })
          .then(async (r) => {
            let data = await r.json();
            let str = data.secure_url.split("restohenry/")[1];
            setImage(str);
            firebase.db.collection("Users").doc(loggedId).update({
              profileImage: str,
            });
            setUploading(false);
          })
          .catch((err) => console.log(err));
      };
    return (
        <View style={globalStyles.Home}>
            <View style={globalStyles.imgContainer}>
          {image && !uploading ? (
            <TouchableOpacity onPress={openImagePickerAsync}>
              <Image
                source={{
                  uri: CLOUDINARY_CONSTANT + image,
                }}
                style={globalStyles.imgProfile}
              />
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="large" color="#5555" style={globalStyles.imgProfile} />
          )}
          <View style={globalStyles.nombreContainer}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: "#392c28",
                textAlignVertical: "top",
              }}
            >
              {currentUser?.title}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#392c28",
                paddingVertical: 15,
              }}
            >
              {currentUser?.email}
            </Text>
            <TouchableOpacity
              style={globalStyles.btn}
              onPress={() => setModalVisible(true)}
            >
              <Text>Edit</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={globalStyles.centeredView}>
                <View style={globalStyles.modalView}>
                  <TouchableOpacity
                    style={globalStyles.touchLog}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text
                      onPress={() => setModalVisible(false)}
                      style={globalStyles.textStyle}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                  <Text style={globalStyles.modalText}>Edit your Username</Text>
                  <Text>Nombre</Text>
                  <TextInput
                    style={globalStyles.texts}
                    placeholder={currentUser?.name}
                    onChangeText={(value) =>
                      setNewUserInfo({
                        ...newUserInfo,
                        name: value,
                      })
                    }
                  />
                  <Text>Apellido</Text>
                  <TextInput
                    style={globalStyles.texts}
                    placeholder={currentUser?.lastName}
                    onChangeText={(value) =>
                      setNewUserInfo({
                        ...newUserInfo,
                        lastName: value,
                      })
                    }
                  />
                  <Text>Celular</Text>
                  <TextInput
                    style={globalStyles.texts}
                    placeholder={currentUser?.cel}
                    onChangeText={(value) =>
                      setNewUserInfo({
                        ...newUserInfo,
                        cel: value,
                      })
                    }
                  />
                  <TouchableOpacity
                    style={globalStyles.touchLog}
                    onPress={() => {
                      sendPasswordResetEmail(auth, currentUser?.email)
                        .then(alert("Revisa tu casilla y volve a ingresar!"))
                        .then(signOut(auth))
                        .then(setModalVisible(false))
                        .then(navigation.navigate("RestoBook"));
                    }}
                  >
                    <Text>Cambiar contraseña</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={globalStyles.touchLog}
                    onPress={() => {
                      firebase.db
                        .collection("Users")
                        .doc(currentUser.id)
                        .update({
                          name: newUserInfo.name,
                          lastName: newUserInfo.lastName,
                          cel: newUserInfo.cel,
                        })
                        .then(alert("cambios guardados!"))
                        .then(setModalVisible(false))
                        .catch((error) => alert("error!"));
                    }}
                  >
                    <Text>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#392c28",
                paddingVertical: 15,
              }}
            >
              {currentUser?.description}
            </Text>
          </View>
        </View>
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