import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Calc = () => {
    const [typedNumbers, setTypedNumbers] = useState([]);
    console.log("typeeddd number", typedNumbers)
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* main */}
            <View style={{ height: '50%', }}>
                {/* input */}
                <View style={{ height: '20%', backgroundColor: 'red' }}>

                    {/* {typedNumbers?.map((e) => {
                        return <Text style={{ color: "#0000" }}>{e}</Text>
                    })} */}

                    <Text>{typedNumbers}</Text>
                </View>
                {/* numbers */}
                <View style={{ height: '80%', flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
                    <View style={{ height: '100%', flexDirection: 'row', width: '80%', flexWrap: 'wrap' }}>
                        {numbers.map((e) => {
                            return (
                                <TouchableOpacity onPress={() => typedNumbers.push(e)} style={{ width: '33%', elevation: 1, height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, fontWeight: '600' }}>{e}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={{ width: '20%', height: '100%', }}>
                        <TouchableOpacity style={{ height: '25%', elevation: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 24, fontWeight: '600' }}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: '25%', elevation: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 24, fontWeight: '600' }}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: '25%', elevation: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 24, fontWeight: '600' }}>*</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: '25%', elevation: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 24, fontWeight: '600' }}> / </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Calc;

const styles = StyleSheet.create({});