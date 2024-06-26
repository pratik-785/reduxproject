import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { arrData } from '../../Data/Data'

const FilterPolyfil = () => {
    Array.prototype.myFilter = function (cb) {
        let temp = [];
        for (let i = 0; i < this.length; i++) {
            if (cb(this[i], i, this)) temp.push(this[i])
        }
        return temp;
    }

    const handleFilter = () => {
        let filterArr = arrData.myFilter((num)=> {
            return num > 4;
        })
        console.log('filterArrrrr',filterArr);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleFilter()} style={styles.btn}>
                <Text style={styles.btnTxt}>Filter</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FilterPolyfil