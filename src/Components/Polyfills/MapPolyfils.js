import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles';
import { arrData } from '../../Data/Data';

const MapPolyfils = () => {
    // const arrData = [1, 2, 3, 4, 5];
    const [mappedArr, setMappedArr] = useState([]);

    Array.prototype.myMap = function (b) {
        let temp = [];
        for (let i = 0; i < this.length; i++) {
            temp.push(b(this[i], i, this));
        }
        return temp;
    }

    const handleMap = () => {
        ToastAndroid.show('Map button pressed', ToastAndroid.LONG);
        const arr = arrData.myMap((num, i, arr) => {
            return num * 2
        })
        console.log("ddddddd", arr)
        setMappedArr(arr);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleMap()} style={styles.btn}>
                <Text style={styles.btnTxt}>Map</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MapPolyfils
