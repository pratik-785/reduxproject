import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Home from './AppStack/HomeStack/Home';
import Profile from './AppStack/ProfileStack/Profile';
import { createStackNavigator } from '@react-navigation/stack';
import AddProducts from './AppStack/HomeStack/AddProducts';
import CartProducts from './AppStack/HomeStack/CartProducts';
import ImageScr from './AppStack/HomeStack/ImageScr';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeStack from './AppStack/HomeStack/HomeStack';
import ProfileStack from './AppStack/ProfileStack/ProfileStack';
import SearchStack from './AppStack/SearchStack/SearchStack';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: { height: 50 },
                }}>
                <Tab.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={({ route }) => ({
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Entypo
                                    name="home"
                                    size={22}
                                    color={focused ? 'orange' : 'black'}
                                />
                            );
                        },
                    })}
                />
                <Tab.Screen
                    name="SearchStack"
                    component={SearchStack}
                    options={({ route }) => ({
                        tabBarIcon: ({ focused }) => {
                            return (
                                <AntDesign
                                    name="search1"
                                    size={24}
                                    color={focused ? 'orange' : 'black'}
                                />
                            );
                        },
                    })}
                />
                <Tab.Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    options={({ route }) => ({
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Entypo
                                    name="list"
                                    size={26}
                                    color={focused ? 'orange' : 'black'}
                                />
                            );
                        },
                    })}
                />

            </Tab.Navigator>
        </View>
        // <Stack.Navigator screenOptions={{ headerShown: false }} >
        //     <Stack.Screen name="Home" component={Home} />
        //     <Stack.Screen name="Profile" component={Profile} />
        //     <Stack.Screen name="AddProducts" component={AddProducts} />
        //     <Stack.Screen name="CartProducts" component={CartProducts} />
        //     <Stack.Screen name="ImageScr" component={ImageScr} />
        // </Stack.Navigator>
    )
}

export default MainStack;

const styles = StyleSheet.create({});