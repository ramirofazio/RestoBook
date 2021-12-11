import React, { useState, useRef, useEffect } from "react";
import {
  CLOUDINARY_URL,
  CLOUDINARY_CONSTANT,
  DEFAULT_PROFILE_IMAGE,
} from "@env";
import { useSelector } from "react-redux";
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
import { Divider } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
//------FIREBASE----------------
import firebase from "../database/firebase";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  doc,
  onSnapshot,
  collection,
  query,
  getDoc,
  getDocs,
  where,
} from "firebase/firestore";
//--------------------------------
//---------STYLES-----------------
import globalStyles from "./GlobalStyles";
//--------------------------------
//-------COMPONENTS---------------
import CardReservation from "../components/CardReservation";
import CardFavourite from "../components/CardFavourite";
//---------------------------------

//
//
//---------SCREENS & COMPONENTS---------------

//
//
//-------ICONS-------
import { Icon } from "react-native-elements";
//
//

//-------INITIALIZATIONS-------
const auth = getAuth();

//
//---------------------------------------------------------------------------------------//
//

const ProfileResto = ({ navigation }) => {
  const loggedId = useSelector((state) => state.currentId);
  const commerceInfo = useSelector((state) => state.commerceInfo);
  const [availableCommerces, setAvailableCommerces] = useState({});
  const [image, setImage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newCommerceInfo, setNewCommerceInfo] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      const docRef = doc(firebase.db, "Restos", commerceInfo);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let obj = docSnap.data();
        obj.id = docSnap.id;
        setAvailableCommerces(obj);
        setImage(obj.restoImage)
        setNewCommerceInfo(obj);
      } else {
        alert("NO HAY INFO");
      }
    };
    getInfo();
  }, [commerceInfo]);

  useEffect(() => {
    return () => {
      setAvailableCommerces({});
    };
  }, []);
  // useEffect(() => {
  //   const q = query(
  //     collection(firebase.db, "Restos"),
  //     where("idUser", "==", loggedId)
  //   );
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       let obj = doc.data();

  //       setImage(obj.restoImage);
  //       setAvailableCommerces(obj);
  //     });
  //   });
  // }, []);
  // console.log("available en resto", availableCommerces);

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
        firebase.db.collection("Restos").doc(availableCommerces.id).update({
          restoImage: str,
        });
        setUploading(false);
      })
      .catch((err) => console.log(err));
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View style={globalStyles.Perfilcontainer}>
      <ScrollView
        style={globalStyles.Perfilcontainer}
        contentContainerStyle={{ flex: 1 }}
      >
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
            <ActivityIndicator
              size="large"
              color="#5555"
              style={globalStyles.imgProfile}
            />
          )}
          <View style={globalStyles.nombreContainer}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: "#161616",
                textAlignVertical: "top",
                textTransform: "capitalize",
              }}
            >
              {availableCommerces?.title}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#161616",
                paddingVertical: 15,
                textTransform: "capitalize",
              }}
            >
              {availableCommerces?.location?.address.split(",")[0]},
              {availableCommerces?.location?.address.split(",")[1]}
            </Text>
            <TouchableOpacity
              style={globalStyles.btnLogin}
              onPress={() => setModalVisible(true)}
            >
              <Text style={globalStyles.texts}>Editar</Text>
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
                    style={globalStyles.btnTodasComidas}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={globalStyles.texts}>X</Text>
                  </TouchableOpacity>
                  <Text style={globalStyles.modalText}>Editar información</Text>
                  {/* <Text style={globalStyles.texts}>Nombre del Resto:</Text>
                  <TextInput
                    style={globalStyles.inputComponent}
                    placeholder={availableCommerces?.title}
                    placeholderTextColor="#666"
                    textAlign="center"
                    onChangeText={(value) =>
                      setNewUserInfo({
                        ...newUserInfo,
                        title: value,
                      })
                    }
                  /> */}
                  <Text style={globalStyles.texts}>Telefono:</Text>
                  <TextInput
                    style={globalStyles.inputComponent}
                    placeholder={availableCommerces?.phone}
                    placeholderTextColor="#666"
                    textAlign="center"
                    onChangeText={(value) =>
                      setNewCommerceInfo({
                        ...newCommerceInfo,
                        phone: value,
                      })
                    }
                  />
                  <Text style={globalStyles.texts}>Telefono 2:</Text>
                  <TextInput
                    style={globalStyles.inputComponent}
                    placeholder={availableCommerces?.phone2}
                    placeholderTextColor="#666"
                    textAlign="center"
                    onChangeText={(value) =>
                      setNewCommerceInfo({
                        ...newCommerceInfo,
                        phone2: value,
                      })
                    }
                  />
                  <Text style={globalStyles.texts}>Email:</Text>
                  <TextInput
                    style={globalStyles.inputComponent}
                    placeholder={availableCommerces?.email}
                    placeholderTextColor="#666"
                    textAlign="center"
                    onChangeText={(value) =>
                      setNewCommerceInfo({
                        ...newCommerceInfo,
                        email: value,
                      })
                    }
                  />
                  {/* <TouchableOpacity
                    style={globalStyles.btnLogin}
                    onPress={() => {
                      sendPasswordResetEmail(auth, currentUser?.email)
                        .then(alert("Revisa tu casilla y volve a ingresar!"))
                        .then(signOut(auth))
                        .then(setModalVisible(false))
                        .then(navigation.navigate("RestoBook"));
                    }}
                  >
                    <Text style={globalStyles.texts}>Cambiar contraseña</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={globalStyles.btnLogin}
                    onPress={() => {
                      firebase.db
                        .collection("Restos")
                        .doc(availableCommerces.id)
                        .update({
                          phone: newCommerceInfo.phone,
                          phone2: newCommerceInfo.phone2,
                          email: newCommerceInfo.email,
                        })
                        .then(alert("cambios guardados!"))
                        .then(setModalVisible(false))
                        .catch((error) => alert("error!"));
                    }}
                  >
                    <Text style={globalStyles.texts}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#161616",
            paddingVertical: 15,
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.description}
        </Text>

        <Text style={{ fontSize: 25, color: "#161616", textAlign: "center" }}>
          <Icon name="home" type="font-awesome-5" color="#161616" size={25} />{" "}
          Mis Comercios
        </Text>
        <Divider
          orientation="horizontal"
          width={2}
          inset={true}
          insetType={"middle"}
          color={"rgba(00, 00, 00, .5)"}
          style={{ marginVertical: 10 }}
        />
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={globalStyles.FavouriteContainer}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
          scrollEventThrottle={1}
        >
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
        </ScrollView>
        <TouchableOpacity
          onPress={() => alert("abro modal")}
          style={globalStyles.btnProfileResto}
        >
          <Icon
            name="clipboard-list"
            type="font-awesome-5"
            color="#392c28"
            size={24}
          />
          <Text style={{ fontSize: 25, color: "#392c28", textAlign: "center" }}>
            Administrar Reservas
            {/* 'clipboard-list' */}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => alert("abro modal")}
          style={globalStyles.btnProfileResto}
        >
          <Icon
            name="street-view"
            type="font-awesome-5"
            color="#392c28"
            size={24}
          />
          <Text style={{ fontSize: 25, color: "#392c28", textAlign: "center" }}>
            Editar Lugares Disponibles
            {/* street-view */}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => alert("abro modal")}
          style={globalStyles.btnProfileResto}
        >
          <Icon name="clock" type="font-awesome-5" color="#392c28" size={24} />
          <Text style={{ fontSize: 25, color: "#392c28", textAlign: "center" }}>
            Editar Horario Comercial
            {/* clock */}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileResto;
