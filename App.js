import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js'
import 'react-native-gesture-handler';
import Navigator from './routes/Navigator.js';

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
