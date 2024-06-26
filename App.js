import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import Home from './src/Stacks/AppStack/HomeStack/Home';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/Stacks/MainStack';
import AppNav from './src/Navigation/AppNav';
// import { store } from './src/Redux/Store';


const App = () => {
  return (
    // <NavigationContainer>
      <Provider store={store} >

        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
        {/* <addProducts /> */}
        {/* <MainStack /> */}
        <AppNav />
        {/* </View> */}
      </Provider>
    // </NavigationContainer>
    // {/* <TouchableOpacity style={{}}>
    //     <Text style={styles.txt}>Increment</Text>
    //   </TouchableOpacity>
    //   <View style={{ marginVertical: 20 }}>
    //     <Text style={[styles.txt,{fontSize:30}]}>0</Text>
    //   </View>
    //   <TouchableOpacity>
    //     <Text style={styles.txt}>Decrement</Text>
    //   </TouchableOpacity> */}
  )
}

export default App;

const styles = StyleSheet.create({
  txt: { fontSize: 20, color: '#000', fontWeight: '600' }
});