import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Profile from '../ProfileStack/Profile';
import { createStackNavigator } from '@react-navigation/stack';

import ViewMyOrders from './ViewMyOrders';
import Calc from './Calc';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, }} >
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ViewMyOrders" component={ViewMyOrders} />
            <Stack.Screen name="Calc" component={Calc} />
         
        </Stack.Navigator>
    )
}

export default ProfileStack

const styles = StyleSheet.create({})