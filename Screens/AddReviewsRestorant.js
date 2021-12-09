import React,{useState} from 'react';
import { useSelector } from "react-redux";
import {Input, Button, AirbnbRating} from 'react-native-elements'
import { StyleSheet, View, Modal, TextInput, ActivityIndicator, } from "react-native";
import {isEmpty} from 'lodash'
//----------FIREBASE UTILS-----------
import firebase from "../database/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


export default function AddReviewsRestorant({navigation}) {
    const currentId = useSelector((state) => state.currentId)
    const empresaDetail = useSelector((state) => state.empresaDetail);
    const [rating, setRating] = useState(null)
    const [review, setReview] = useState("")
    const [errorReview, setErrorReview] = useState(null)
   const empresaDetail= empresaDetail.idResto

     addReview = async () => {
        if(!validForm()){
            return
        }
        const newValues = {
            currentId: currentId,
            empresaDetail: empresaDetail,
            review: review,
            rating: rating,
        }
           try {
             let restoRef = doc(firebase.db, "Restos", empresaDetail);
             await updateDoc(restoRef, {
               reviews: arrayUnion(newValues),
            });
            navigation.goBack()
           } catch (err) {
             console.log(err);
           }
        }
    }
    const validForm = () => {
        setErrorReview(null)
        let isValue = true
        if(isEmpty(review)) {
        setErrorReview("Completá tu comentario", 3000)
        isValue=false
        }

        return isValue
    }
    return (
        <View style={styles.container}>
            <Modal animationType="slide" transparent={true}>
                <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Malo", "Regular", "Normal", "Bueno", "Excelente"]}
                    defaultRating={0}
                    size={20}
                    onFinishRating={(value) => setRating(value)}
                >
                </AirbnbRating>
            </View>
            <View style={styles.comentarios}>
            <Input
            placeholder="comentario..."
            containerStyle={styles.containerInput}
            style={styles.input}
            onChange={(e) => setReview(e.nativeEvent.text)}
            errorMessage={errorReview}
            />
            </View>
            <Button
                title="Enviar Comentario"
                containerStyle={styles.containerButon}
                style={styles.buton}
                onPress={addReview}
            >
            </Button>
            </Modal>
            </View>
    )
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f2f2f2'
    },
    viewRating:{
        height: 110,
        backgroundColor:'#f2f2f2',
        marginTop:100,
        marginBottom:2
    },
    comentarios:{
        flex:1,
        alignItems:"center",
        margin:10,
        marginTop:10
    },
    containerInput:{
        marginBottom:10
    },
    input:{
        height:150,
        width:'100%',
        padding:0,
        margin:0
    },
    containerButon:{
        
    },
    buton:{
        margin:30
    }

})
