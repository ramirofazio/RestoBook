import React,{useState} from 'react';
import { useSelector } from "react-redux";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Icon } from 'react-native-elements';
import globalStyles from './GlobalStyles';
import CardReviews from "../components/CardReviews";
import { TouchableOpacity } from 'react-native-gesture-handler';
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
                    <TouchableOpacity 
                    style={globalStyles.btnFiltrosHome}
                    onPress={() => navigation.navigate("AddReviewsRestorant")}
                    >
                        <Icon name='square-edit-outline' type='material-community' color='#161616' size={25} /> 
                        <Text style={globalStyles.texts}>Escribe una opinion</Text>
                    </TouchableOpacity>
                    // <Button
                    // buttonStyle={globalStyles.btnFiltrosHome}
                    // title="Escribe una opinion"
                    // titleStyle={globalStyles.texts}
                    // onPress={() => navigation.navigate("AddReviewsRestorant")}
                    // icon={{
                    //     type:"material-community",
                    //     name:"square-edit-outline",
                    //     color:"#161616"
                    // }}
                    // /> 
                        ) : (
                    <Text
                    style={globalStyles.texts}
                    onPress={()=> navigation.navigate("GlobalLogin")}
                    >
                        Para escribir una opinion es necesario estar logeado.{" "}
                    <Text style={globalStyles.texts}>
                        Pulsa aqui para iniciar sesion 
                    </Text>
                    </Text>
                )}
            { reviews?.length >0 ? (
                <ScrollView style={styles.showMenu}>
                             {
                                 reviews.map(review => <CardReviews reseña={review} key={review.createAt}></CardReviews>)
                             }
                        </ScrollView>) : <Text style={globalStyles.texts}> Este negocio aun no tiene comentarios</Text>}
        </View>

                )
}

const styles = StyleSheet.create({
    container:{
    },
    btnAddReview:{
    },
    btnTitleAddReview:{
    },
    mustLoginText:{
    },
    showMenu: {
        height: 250,
        padding: 5,
        borderWidth: 0,
      }
}) 