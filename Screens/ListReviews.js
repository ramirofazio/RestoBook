import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Button } from 'react-native-elements';
import empresaDetail from '../Redux/Actions/empresaDetail';
import { TouchableOpacity } from 'react-native-gesture-handler';
const auth=getAuth();

export default function ListReviews({navigation}){
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
                )
            }
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