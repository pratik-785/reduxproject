import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search';

const Stack = createStackNavigator();

const SearchStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, }} >
            <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
    )
}

export default SearchStack;

const styles = StyleSheet.create({});