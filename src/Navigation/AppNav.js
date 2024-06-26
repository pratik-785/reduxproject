import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import MainStack from '../Stacks/MainStack';

const AppNav = () => {
    return (
        <NavigationContainer>
            
            <AppStack />
        </NavigationContainer>
    )
}

export default AppNav;

const styles = StyleSheet.create({});