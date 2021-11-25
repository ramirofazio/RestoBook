import React, { useState } from 'react';
import { View, Text } from 'react-native';
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
        <View>
            <Button
                title="cambiar estado"
                onPress={onPress}
            />

            <Text>{state}</Text>
        </View>
    )
}