import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../Feature/todo/todoSlice';

const Todos = () => {
    const {todos, data} = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const remobeTodoHandler = (itemId) => {
        // console.log("item.iddddd", itemId)
        dispatch(removeProduct(itemId));
    }

    const renderItem = (item) => {
        // console.log("item",item.item.text);
        const { text, id } = item?.item;
        return (
            <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', flex: 1 }}>
                <View style={{ flexDirection: 'row', height: 200, width: '99%', justifyContent: 'space-between', backgroundColor: 'red' }}>
                    <Text>{text}</Text>
                    <TouchableOpacity onPress={()=> remobeTodoHandler(id) }>
                        <Text>Del</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, width: '100%', marginTop: 10 }}>
            {/* <Text>Todos</Text> */}
            <FlatList numColumns={2} data={todos} renderItem={renderItem} />
        </View>
    )
}

export default Todos;

const styles = StyleSheet.create({});