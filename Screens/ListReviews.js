import React,{useState} from 'react';
import { useSelector } from "react-redux";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Button } from 'react-native-elements';
import CardReviews from "../components/CardReviews";
import { TouchableOpacity } from 'react-native-gesture-handler';
import empresaDetail from '../Redux/Actions/empresaDetail';
const auth=getAuth();

export default function ListReviews({navigation, reviews}){
    const empresaDetail = useSelector((state) => state.empresaDetail)
    const [userLogged, setUserLogged] = useState(false)
   onAuthStateChanged(auth, (usuarioFirebase) => {
       if(usuarioFirebase){
           setUserLogged(true)
       }
       else{
           setUserLogged(false)
       }
   })
    return (
        <View>
            {
                userLogged ? (
                    <Button
                    buttonStyle={styles.btnAddReview}
                    title="Escribe una opinion"
                    titleStyle={styles.btnTitleAddReview}
                    onPress={() => navigation.navigate("AddReviewsRestorant")}
                    icon={{
                        type:"material-community",
                        name:"square-edit-outline",
                        color:"white"
                    }}
                    /> 
                        ) : (
                    <Text
                    style={styles.mustLoginText}
                    onPress={()=> navigation.navigate("GlobalLogin")}
                    >
                        Para escribir una opinion es necesario estar logeado.{" "}
                    <Text style={styles.loginText}>
                        Pulsa aqui para iniciar sesion 
                    </Text>
                    </Text>
                )}
            { reviews?.length >0 ? (
                <ScrollView style={styles.showMenu}>
                             {
                                 reviews.map(review => <CardReviews key={review.createAt} reseña={review}></CardReviews>)
                             }
                        </ScrollView>) : <Text> Este negocio aun no tiene comentarios</Text>}
        </View>
                )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        borderRadius:10
    },
    btnAddReview:{
    },
    btnTitleAddReview:{
    },
    mustLoginText:{
        margin:20,
        backgroundColor:'white',
    },
    loginText:{

    }
}) 