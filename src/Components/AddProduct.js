import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from '../Feature/todo/todoSlice';
import Todos from './Todos';

const addProducts = () => {
    const [todoTitle, setTodoTitle] = useState('');
    const dispatch = useDispatch()

    const addProductHandler = (todo) => {
        // console.log("adddTodoo", e);
        dispatch(addProduct(todo));
        setTodoTitle('');
    }
    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
            {/* <Text>addProducts</Text> */}
            <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
                <TextInput value={todoTitle} onChangeText={(e) => setTodoTitle(e)} style={{ width: '90%', height: 40, borderRadius: 4, borderWidth: 1 }} />
            </View>
            <TouchableOpacity onPress={() => addProductHandler(todoTitle)} style={{ marginTop: 10, backgroundColor: 'red', borderRadius: 4, width: '90%', height: 36, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>Add</Text>
            </TouchableOpacity>
            <Todos />
        </View>
    )
}

export default addProducts;

const styles = StyleSheet.create({});