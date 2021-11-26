import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './routes/homeStack';


export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Navigator/>
          <StatusBar style="auto" />
        </View>
      </SafeAreaProvider>
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
