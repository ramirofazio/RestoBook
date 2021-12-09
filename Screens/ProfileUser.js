import React, { useState, useRef, useEffect } from "react";
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
import * as ImagePicker from "expo-image-picker";
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
import { CLOUDINARY_URL, CLOUDINARY_CONSTANT } from "@env";
import globalStyles from "./GlobalStyles";
import StarFilled from "react-native-vector-icons/AntDesign";
import TagOutlined from "react-native-vector-icons/AntDesign";
import CardHome from "../components/CardHome.js";
import CardReservation from "../components/CardReservation";
const auth = getAuth();
const reservas = [
  {
    id: 1,
    name: "Laial",
    email: "@laialasase",
    reserva: {
      cantidad: 2,
      fecha: "1/12/2021",
      horario: "22.00hs",
      bar: {
        barName: "Los campeones",
        direccion: "Wilde 200",
      },
    },
  },
  {
    id: 2,
    name: "Rama",
    email: "@ramifazio",
    reserva: {
      cantidad: 5,
      fecha: "02/01/2021",
      horario: "00.00hs",
      bar: {
        barName: "Nebraska",
        direccion: "Laprida 600",
      },
    },
  },
];
// let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/restobook/image/upload";
let imgPerrito =
  "https://res.cloudinary.com/restobook/image/upload/samples/bike.jpg";
const ProfileUser = ({ navigation }) => {
  const empresas = [
    {
      "category": "",
      "cuit": "2081828284",
      "description": "Comidas rapidas",
      "email": "francobrizueladev@gmail.com",
      "idResto": "JyZ4DGShfFONQVE9y4fj",
      "idUser": "sNYshQ9DEYggznBVA38DF2BNXfM2",
      "img": "",
      "location": {
        "address": "",
        "latitude": -34.61315,
        "longitude": -58.37723,
      },
      "menu": [
        {
          "description": "Las pastas de gran ",
          "foodName": "Pastas feas",
          "img": "file:///var/mobile/Containers/Data/Application/D09EF3A7-9869-49DF-8A6A-63D51A6363EE/Library/Caches/ExponentExperienceData/%2540anonymous%252FRestoBook-536ab453-cf09-435d-b7e1-150ec487fa5a/ImagePicker/6B864B78-4D6C-41D6-833C-0C10064237A7.jpg",
          "price": "500",
        },
      ],
      "phone": "221783991",
      "phone2": "221738282",
      "razonSocial": "",
      "title": "McDonald Fran",
    },
    {
      "category": "",
      "cuit": "123456789",
      "description": "El restaurante de Ramiro ",
      "email": "ramiazio@gmail.com",
      "idResto": "XqjVxo9rTjxfZ0RNPQeT",
      "idUser": "tBsnBsAtBWeIvTmUUc8MUlB5x882",
      "img": "",
      "location": {
        "address": "",
        "latitude": -34.61315,
        "longitude": -58.37723,
      },
      "menu": [
        {
          "description": "hamburguesas con jamon y queso",
          "foodName": "hamburguesas",
          "img": "",
          "price": "200",
        },
      ],
      "phone": "2477313700",
      "phone2": "",
      "razonSocial": "",
      "title": "Rami Resto",
    },
    {
      "category": "",
      "cuit": "272818181",
      "description": "Vivo abajo del puente ",
      "email": "franco_lq@hotmail.com",
      "idResto": "dt88DfXbO8crYQo0DyUo",
      "idUser": "sNYshQ9DEYggznBVA38DF2BNXfM2",
      "img": "",
      "location": {
        "address": "",
        "latitude": -34.61315,
        "longitude": -58.37723,
      },
      "menu": [],
      "phone": "272818181",
      "phone2": "272828272",
      "razonSocial": "",
      "title": "London Bridge",
    },
    {
      "category": "Hamburguesas",
      "cuit": "27282828181",
      "description": "Sjskskskskakska",
      "email": "ñaial",
      "idResto": "jtviznmMDLe0mFuXTusB",
      "idUser": "sNYshQ9DEYggznBVA38DF2BNXfM2",
      "img": "",
      "location": {
        "address": "San Lorenzo 2551, Resistencia, Chaco, Argentina",
        "latitude": -27.4768112,
        "longitude": -59.00318550000001,
      },
      "menu": [
        {
          "description": "Jajajaja",
          "foodName": "Jdsjakka",
          "img": "file:///var/mobile/Containers/Data/Application/D09EF3A7-9869-49DF-8A6A-63D51A6363EE/Library/Caches/ExponentExperienceData/%2540anonymous%252FRestoBook-536ab453-cf09-435d-b7e1-150ec487fa5a/ImagePicker/4E105187-B861-4C29-BA8E-5216A2D3D18A.jpg",
          "price": "650",
        },
      ],
      "phone": "2727171",
      "phone2": "2727272",
      "razonSocial": "",
      "title": "Casa laial ",
    },
  ]
  const loggedUser = useSelector((state) => state.currentUser);
  const loggedId = useSelector((state) => state.currentId);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [newUserInfo, setNewUserInfo] = useState({});
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  // useEffect(() => {
  //   const q = query(collection(firebase.db, "Users"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       if (doc.id === loggedId) {
  //         let obj = doc.data();
  //         setImage(obj.profileImage);
  //         setCurrentUser(obj);
  //         setNewUserInfo(obj);
  //       }
  //     });
  //   });
  // }, [loggedId]);

  useEffect(() => {
    const getInfo = async () => {
      const docRef = doc(firebase.db, "Users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let obj = docSnap.data();
        console.log("obj", obj);
        setImage(obj.profileImage);
        setCurrentUser(obj);
        setNewUserInfo(obj);
      } else {
        alert("NO HAY INFO");
      }
    };
    getInfo();
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
  ///////////////////FUNCION STORAGE FIREBASE LAIAL COMENTADA PARA REVISION///////////
  // const uploadImage = async () => {
  //     const blob = await new Promise((resolve, reject) => {
  //         const xhr = new XMLHttpRequest();
  //         xhr.onload = function() {
  //           resolve(xhr.response);
  //         };
  //         xhr.onerror = function() {
  //           reject(new TypeError('Network request failed'));
  //         };
  //         xhr.responseType = 'blob';
  //         xhr.open('GET', image, true);
  //         xhr.send(null);
  //       });

  //     const ref = firebase.storage.ref().child(new Date().toISOString())
  //     const snapshot = ref.put(blob)

  //     snapshot.on(
  //         firebase.storage.TaskEvent.STATE_CHANGED,
  //         () => {
  //         setUploading(true)
  //     },
  //     (error)=> {
  //         setUploading(false)
  //         console.log(error)
  //         blob.close()
  //         return
  //     },
  //     () => {
  //         snapshot.snapshot.ref.getDownloadURL().then((url)=> {
  //             setUploading(false)
  //             console.log('download url: ', url)
  //             blob.close();
  //             return url
  //         })
  //     }
  //     )
  // }
  // return (
  //     <View style={styles.container} >
  //         <ScrollView style={styles.container} contentContainerStyle={{flex: 1}}>
  //             <View style={styles.imgContainer}>
  //                 {
  //                     !image ?
  //                     <Image
  //                         source={'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg'}
  //                         style={styles.img}
  //                     />
  //                     :
  //                     <Image
  //                         source={image.localUri}
  //                         style={styles.img}
  //                     />
  //                 }
  //                 {/* {
  //                     image ? (<TouchableOpacity onPress={openImagePicker}>
  //                         <Image
  //                             source={{ uri: image !== null ? image.localUri : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg' }}
  //                             style={styles.img}
  //                         />
  //                     </TouchableOpacity>)
  //                         : (<TouchableOpacity onPress={openImagePicker}>
  //                             <Image
  //                                 source={{ uri: image !== null ? image.localUri : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg' }}
  //                                 style={styles.img}
  //                             />
  //                         </TouchableOpacity>
  //                         )

  //                     } */}
  //                     {/* { // si la imagen no se esta cargando a firebase que este el boton
  //                         !uploading ? <TouchableOpacity
  //                         style={globalStyles.btn}
  //                         onPress={uploadImage}
  //                         >
  //                             <Text>SUBIR IMAGEN</Text>
  //                         </TouchableOpacity>
  //                         :
  //                         // y cuando se este cargando que active el spiner
  //                         (
  //                         <ActivityIndicator size='large' color='#5555'/>
  //                         )
  //                     } */}
  ///////////////////////////////////////////////////////////////////////////
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.imgContainer}>
          {image && !uploading ? (
            <TouchableOpacity onPress={openImagePickerAsync}>
              <Image
                source={{
                  uri: CLOUDINARY_CONSTANT + image,
                }}
                style={styles.img}
              />
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="large" color="#5555" style={styles.img} />
          )}
          <View style={styles.nombreContainer}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: "#392c28",
                textAlignVertical: "top",
              }}
            >
              {currentUser?.name}
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
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={globalStyles.touchLog}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text
                      onPress={() => setModalVisible(false)}
                      style={styles.textStyle}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.modalText}>Cambia Tu Usuario</Text>
                  <View style={{ marginVertical: 25, width: "100%" }}>
                    <Text style={{ textAlign: "center", marginBottom: -15 }}>Nombre: </Text>
                    <View style={globalStyles.inputComponent}>
                      <TextInput
                        style={globalStyles.texts}
                        placeholder={currentUser?.name}
                        placeholderTextColor="#555"
                        onChangeText={(value) =>
                          setNewUserInfo({
                            ...newUserInfo,
                            name: value,
                          })
                        }
                      />
                    </View>
                    <Text style={{ textAlign: "center", marginBottom: -15 }}>Apellido: </Text>
                    <View style={globalStyles.inputComponent}>
                      <TextInput
                        style={globalStyles.texts}
                        placeholder={currentUser?.lastName}
                        placeholderTextColor="#555"
                        onChangeText={(value) =>
                          setNewUserInfo({
                            ...newUserInfo,
                            lastName: value,
                          })
                        }
                      />
                    </View>
                    <Text style={{ textAlign: "center", marginBottom: -15 }}>Celular: </Text>
                    <View style={globalStyles.inputComponent}>
                      <TextInput
                        style={globalStyles.texts}
                        placeholder={currentUser?.cel}
                        placeholderTextColor="#555"
                        onChangeText={(value) =>
                          setNewUserInfo({
                            ...newUserInfo,
                            cel: value,
                          })
                        }
                      />
                    </View>
                  </View>
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
          </View>
        </View>
        <Text style={{ fontSize: 25, color: "#392c28", textAlign: "center" }}>
          {" "}
          <StarFilled name="star" color="#392c28" size={25} /> FAVORITOS
        </Text>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.FavouriteContainer}
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
          {empresas.map((resto) => {
            return (
              <View style={{ width: windowWidth, height: 250 }}>
                <CardHome
                  key={resto.Id}
                  resto={resto}
                  navigation={navigation}
                  index={resto.Id}
                >
                  {" "}
                </CardHome>
              </View>
            );
          })}
        </ScrollView>
        <Text style={{ fontSize: 25, color: "#392c28", textAlign: "center" }}>
          <TagOutlined name="tag" color="#392c28" size={25} /> My Reservations
        </Text>
        <ScrollView style={{ overflow: "scroll" }}>
          {reservas.map((persona) => {
            return (
              <View>
                <CardReservation
                  key={persona.id}
                  persona={persona}
                  index={persona.id}
                />
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6c2bf",
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 200,
    // resizeMode: 'contain' // esta linea es para que se adapte al tam;o de la imagen
  },
  imgContainer: {
    flex: 2,
    flexDirection: "row",
    // backgroundColor: 'red',
    maxHeight: "25%",
    maxWidth: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  nombreContainer: {
    flex: 2,
    // backgroundColor: 'grey',
    // marginHorizontal: 5,
    maxWidth: "60%",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  FavouriteContainer: {
    overflow: "scroll",
    backgroundColor: "#5555",
    maxHeight: "30%",
    height: "40%",
  },
  //----------------------- modal css?? ---------------------------------
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#ffffff10",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    height: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 30,
      height: 30,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  botton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    //float: "right",
  },
  bottonClose: {
    backgroundColor: "#2196F3",
  },
});

export default ProfileUser;
