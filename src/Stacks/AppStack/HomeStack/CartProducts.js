import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productDecreament, productIncreament } from '../../../Feature/todo/todoSlice';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'


const CartProducts = () => {
    const cartData = useSelector(state => state.cartData);
    console.log("carrtdataa", cartData)
    const dispatch = useDispatch();
    const handleIncrease = (item) => {
        dispatch(productIncreament(item))
    }
    const handleDecrease = (item) => {
        dispatch(productDecreament(item))
    }

    const renderItem = ({ item }) => {
        const firstImgOfProduct = item?.image === undefined ? 'https://staroutloud.wordpress.com/wp-content/uploads/2017/02/12393679_149467882082197_310481006_n.jpg' : item?.image[0]?.path;
        // console.log("imageeeeeeeeeeeeeeeeeeeeeeeee",item?.image[0]?.path)

        return (
            <View style={{ flexDirection: 'row', height: 160, justifyContent: 'center', alignItems: 'center', padding: 6, borderBottomWidth: 0.8, borderBottomColor: '#222', width: '100%' }}>
                <View style={{ width: '30%', }}>
                    {/* <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.title}</Text> */}
                    {/* {!firstImgOfProduct ? null : */}
                    <Image source={{ uri: firstImgOfProduct }} style={{ height: '80%', width: '80%', resizeMode: 'cover' }} />
                    {/* } */}
                </View>
                <View style={{ width: '70%', }}>
                    <Text style={{ fontSize: 14, color: '#000', fontWeight: '600' }}>{item.title}</Text>
                    <Text style={{ fontSize: 10, fontWeight: '600', marginVertical: 3 }} numberOfLines={2}>{item.description}</Text>
                    <Text style={{ fontSize: 16, color: '#000', fontWeight: '600' }}>{item.price}</Text>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', width: 120, height: 24, marginTop: 4 }}>
                        <TouchableOpacity onPress={() => handleDecrease(item)} style={{ width: '30%', backgroundColor: '#fff', elevation: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: "#000" }}>-</Text>
                        </TouchableOpacity >
                        <View style={{ width: '40%', backgroundColor: '#fff', elevation: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }} >
                            <Text style={{ fontSize: 16, fontWeight: '600', color: "#000" }}>{item.count}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleIncrease(item)} style={{ width: '30%', backgroundColor: '#fff', elevation: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: "#000" }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, padding: 4 }}>
            <View style={{ height: '6%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6 }}>
                <Text style={{ fontSize: 22, fontWeight: '600', color: '#000' }}>WishList</Text>
                <AntDesign name="heart" size={24} color="red" />
            </View>
            {cartData.length === 0
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <LottieView source={require('../../../Constants/Gif/Animation - 1713532579101.json')} style={{ height: 150, width: 150, }} autoPlay /> */}
                    {/* <Image source={require('../../')} /> */}
                    <View style={{ position: 'relative' }}>
                        <Feather name="shopping-bag" size={60} color="#000" />
                        <View style={{ position: 'absolute', top: 22, right: -22 }}>
                            <Entypo name="cross" size={60} color="red" />
                        </View>
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 20, fontWeight: '600', color: '#000' }}>Your bag looks empty...</Text>
                </View>
                :
                <FlatList data={cartData} renderItem={renderItem} />
            }
        </View>
    )
}

export default CartProducts

const styles = StyleSheet.create({})