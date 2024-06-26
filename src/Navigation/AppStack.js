import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainStack from '../Stacks/MainStack'

const AppStack = () => {
    return (
        <View style={{flex: 1}}>
            <MainStack />
        </View>
    )
}

export default AppStack

const styles = StyleSheet.create({})