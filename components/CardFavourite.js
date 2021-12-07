import React from "react";
import { View, Image, TouchableOpacity, Text} from "react-native";
import { useDispatch } from "react-redux";
//-----STYLES----------
import globalStyles from "../Screens/GlobalStyles.js";
//------ICONS----------
import { Icon } from "react-native-elements";
//------ACTIONS---------
import empresaDetail from "../Redux/Actions/empresaDetail.js";


const CardFavourite = ({ resto, navigation }) => {
    
    const handleOnPress = () => {
        dispatch(empresaDetail(resto));
        navigation.navigate("DetailsResto");
      };

    const dispatch = useDispatch();

    return (
        <View style={globalStyles.cardsContainer}>
      <TouchableOpacity
        onPress={() => handleOnPress()}
      >
        <View style={globalStyles.containerImgCard}>
          <Image
            style={globalStyles.cardsHomeimg}
            source={
              resto.Img === ""
                ? {
                  uri: "https://images.vexels.com/media/users/3/204941/isolated/preview/d8bc6d74b3da7ee41fc99b6000c1e6a4-trazo-de-puntuacion-de-signo-de-interrogacion.png",
                }
                : { uri: resto.Img }
            }
          />
        </View>

        <View style={globalStyles.cardsDescriptionContainer}>
          <View>
            <Text style={globalStyles.cardsHomeTitle}>{resto.title}</Text>
          </View>
          <View>
            <Text >{resto.address}</Text>
          </View>
          <View>
            <Text >{resto.phone}</Text>
          </View>
        </View>

        <View style={globalStyles.btnContainerCard}>  
          <View>
            <TouchableOpacity 
              onPress={() => {alert('desfaveé')}}>
              <Icon
                raised
                name='heart'
                type='antdesign'
                color='grey'
                iconStyle='red'
                size={19}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>

    )
};
  
export default CardFavourite;