import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../Redux/Actions';



export default function Home() {

    const dispatch = useDispatch();
    const state = useSelector((state) => state.task)

    const onPress = () => {
        dispatch(addTask('Franco'))
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.button}>

                <Button

                    title="cambiar estado"
                    onPress={onPress}
                />
            </View>

            <Text>{state}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
    },
});