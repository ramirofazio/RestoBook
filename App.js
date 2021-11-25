
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home.js'
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js'

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Home />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
