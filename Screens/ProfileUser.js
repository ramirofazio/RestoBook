import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput,
 Animated, useWindowDimensions, Alert,  Modal, } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import globalStyles from "./GlobalStyles";
import StarFilled from 'react-native-vector-icons/AntDesign';
import TagOutlined from 'react-native-vector-icons/AntDesign';
import { ScrollView } from "react-native-gesture-handler";
import CardHome from '../components/CardHome.js'
import CardReservation from "../components/CardReservation";

const reservas = [
    {
        id: 1,
        name: 'Laial',
        email: '@laialasase',
        reserva: {
            cantidad: 2,
            fecha: '1/12/2021',
            horario: '22.00hs',
            bar: {
                barName: 'Los campeones',
                direccion: 'Wilde 200'
            }
        }
    },
    {
        id: 2,
        name: 'Rama',
        email: '@ramifazio',
        reserva: {
            cantidad: 5,
            fecha: '02/01/2021',
            horario: '00.00hs',
            bar: {
                barName: 'Nebraska',
                direccion: 'Laprida 600'
            }
        }
    }
]


const ProfileUser = ({ navigation }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
    })

    const handleEdit = () => {
        setUser(

        )
    }
    // const [reservation, setReservation] = useState({
    //     personas: 0,
    //     fecha: '',
    //     hora: ''
    // })
    // const [bar, setBar] = useState({
    //     name: '',
    //     adress: ''
    // })


    const [image, setImage] = useState(null)
    const empresas = useSelector((state) => state.empresas);

    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth } = useWindowDimensions();

    let openImagePicker = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync() // este modulo pide permiso al user para leer los archivos de su disp.

        if (permissionResult.granted === false) {
            Alert.alert('Permission to access galery is required');
            return
        }
        const imageSelected = await ImagePicker.launchImageLibraryAsync() // esto va a retornar la imagen que selecciono
        if (imageSelected.cancelled === true) { //si el estado de la seleccion es cancelado (o sea no selecciono una imagen) 
            return; // que no tire error
        }
        setImage({ localUri: imageSelected.uri }) //sino actualizamos el estado con la dir de la imagen
    }
    const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.imgContainer}>
                    {
                        image ? (<TouchableOpacity onPress={openImagePicker}>
                            <Image
                                source={{ uri: image !== null ? image.localUri : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg' }}
                                style={styles.img}
                            />
                        </TouchableOpacity>)
                            : (<TouchableOpacity onPress={openImagePicker}>
                                <Image
                                    source={{ uri: image !== null ? image.localUri : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg' }}
                                    style={styles.img}
                                />
                            </TouchableOpacity>
                            )
                    }
                    <View style={styles.nombreContainer}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: '#392c28', textAlignVertical: "top" }}>{reservas[1].name}</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: '#392c28', paddingVertical: 15 }}>{reservas[1].email}</Text>
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
      <Text style={styles.textStyle}>X</Text>
    </TouchableOpacity>
    <Text style={styles.modalText}>Edit your Username</Text>
   
    <TextInput
      style={globalStyles.texts}
      placeholder="User name"
    />
  
  <TouchableOpacity
                  style={globalStyles.touchLog}
                 
                  >
                  <Text>Save</Text>
                </TouchableOpacity>
  </View>
</View>
</Modal>
                    </View>
                </View>
                <Text style={{ fontSize: 25, color: "#392c28", textAlign: "center" }}> <StarFilled name='star' color="#392c28" size={25} /> FAVORITOS</Text>
                <ScrollView
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.FavouriteContainer}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX
                                }
                            }
                        }
                    ])}
                    scrollEventThrottle={1}
                >
                    {empresas.map(resto => {
                        return (
                            <View
                                style={{ width: windowWidth, height: 250 }}
                            >
                                <CardHome key={resto.Id} resto={resto} navigation={navigation} index={resto.Id}> </CardHome>
                            </View>
                        );
                    })}
                </ScrollView>
                <Text style={{ fontSize: 25, color: "#392c28", textAlign: "center" }}>
                    <TagOutlined name='tag' color="#392c28" size={25} /> My Reservations
                </Text>
                <ScrollView style={{ overflow: "scroll" }}>
                    {reservas.map((persona) => {
                        return (
                            <View>
                                <CardReservation key={persona.id} persona={persona} index={persona.id} />
                            </View>
                        )
                    })}

                </ScrollView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6c2bf'
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
        maxHeight: '25%',
        maxWidth: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 15,

    },
    nombreContainer: {
        flex: 2,
        // backgroundColor: 'grey',
        // marginHorizontal: 5,
        maxWidth: '60%',
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'flex-end'
    },
    FavouriteContainer: {
        overflow: "scroll",
        backgroundColor: '#5555',
        maxHeight: '100%',
        height: "100%",
    },
//----------------------- modal css?? ---------------------------------
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "blur",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "45%",
    height: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 30,
      height: 30
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  botton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    float: "right",
  },
  bottonClose: {
    backgroundColor: "#2196F3",
  },
  });

export default ProfileUser;
