import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function WebViewNavigation({onBackPress, onForwardPress}){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
                onPress = {onBackPress}
            >
                <Text style={styles.buttonTitle}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTitle}
                  onPress = {onForwardPress}
            >
                <Text>Forward</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        height:60,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button:{
        color :'#fff',
        fontSize: 20,
    },
    buttonTitle:{

    }
})