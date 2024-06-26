import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Home from './Home';
import Profile from '../ProfileStack/Profile';
import AddProducts from './AddProducts';
import CartProducts from './CartProducts';
import ImageScr from './ImageScr';
import { createStackNavigator } from '@react-navigation/stack';
import BuyNow from './BuyNow';
import OrderDetails from './OrderDetails';
import OrderCompleted from './OrderCompleted';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, }} >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddProducts" component={AddProducts} />
            <Stack.Screen name="CartProducts" component={CartProducts} />
            <Stack.Screen name="ImageScr" component={ImageScr} />
            <Stack.Screen name="BuyNow" component={BuyNow} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
        </Stack.Navigator>
    )
}

export default HomeStack

const styles = StyleSheet.create({})