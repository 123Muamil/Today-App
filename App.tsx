import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider} from 'react-redux';
import store from './redux/store/index';
import Index from './Index';
const App = () => {
  return (
    <Provider store={store}>
    <Index/>
</Provider>
  )
}

export default App

const styles = StyleSheet.create({})
