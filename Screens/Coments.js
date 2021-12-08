import React,{useState} from 'react';
import {View} from 'react-native';
import {Input, Button} from 'react-native-elements'
import { StyleSheet } from "react-native";
import {isEmpty} from 'lodash'

export default function Coments({navigation}) {
    const [review, setReview] = useState("")
    const [errorReview, setErrorReview] = useState(null)

    const addReview = () => {
        if(!validForm()){
            return
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
            <View style={styles.comentarios}>
            <Input
            placeholder="comentario..."
            containerStyle={styles.containerInput}
            style={styles.input}
            onChange={(e) => setReview(e.target)}
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
        </View>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
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

    }

})
