import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../Feature/todo/todoSlice';
import ImagePickerComp from '../../../Components/ImagePickerComp';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddProducts = ({ navigation }) => {
    const [titleInput, setTitleInput] = useState('');
    const [descInput, setDescInput] = useState('');
    const [image, setImage] = useState();
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const dispatch = useDispatch();
    const handleSave = () => {
        let productDetails = { title: titleInput, description: descInput, image: image, category: category, price: price };
        // let productDetails = { title: "HP 15s-eq2182AU (6K7U2PA)", description: "HP 15s-eq2182AU (6K7U2PA) Laptop (AMD Hexa Core Ryzen 5/16 GB/512 GB SSD/Windows 11) price in India starts from Rs. 41,990", image: image, category: 'Gadget', price: 41000 };
        // console.log('proddddd',productDetails)
        dispatch(addProduct(productDetails));
        navigation.goBack();
    }
    const handleDeleteImage = (item) => {
        // console.log("itemmm",item) deleteImageFromAddProduct: (state, action) => {
        let parts = item.path.split("/");
        let dd = parts.pop()
        const newImageArr = image.filter((img) => {
            let ll = img.path.split("/");
            let cc = ll.pop()
            return (
                cc !== dd
            )
        })
        setImage(newImageArr)

    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ width: 112 }}>
                <Image source={{ uri: item.path }} style={{ position: 'relative', backgroundColor: 'red', height: 100, width: 110, marginHorizontal: 1 }} />
                <TouchableOpacity onPress={() => handleDeleteImage(item)} style={{ position: 'absolute', right: 2, elevation: 6, top: 2, height: 20, width: 20, }}>
                    <MaterialIcons name='delete' size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        )
    }

    const handlePriceInput = (e) => {
        console.log("first", e)
        // let tt = Number(e);
        // let dd = tt.toLocaleString('en-IN')
        setPrice(e)

    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ marginTop: 30 }}>
                <View style={styles.inputContainer}>
                    <TextInput value={titleInput} keyboardType='email-address' inputMode='email' onChangeText={(e) => setTitleInput(e)} style={styles.inputStyle} placeholder='Title' placeholderTextColor={'#888'} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput value={descInput} onChangeText={(e) => setDescInput(e)} style={styles.inputStyle} placeholder='Description' placeholderTextColor={'#888'} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput value={category} onChangeText={(e) => setCategory(e)} style={styles.inputStyle} placeholder='Category' placeholderTextColor={'#888'} />
                </View>
                <View style={styles.inputContainer}>
                    {/* <TextInput value={Number(price).toLocaleString()} onChangeText={(e) => handlePriceInput(e)} keyboardType='numeric' style={styles.inputStyle} placeholder='Price' placeholderTextColor={'#888'} /> */}
                    <TextInput value={price} onChangeText={(e) => handlePriceInput(e)} keyboardType='numeric' style={styles.inputStyle} placeholder='Price' placeholderTextColor={'#888'} />
                </View>
                <View style={styles.inputContainer}>
                    <ImagePickerComp image={image} setImage={setImage} />
                </View>
                <FlatList data={image} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} />

            </View>
            <TouchableOpacity onPress={() => handleSave()} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', width: '100%', height: 40, borderRadius: 6, marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: "#fff" }}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddProducts;

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginVertical: 8,

    },
    inputStyle: {
        width: '100%',
        height: 40,
        borderWidth: 0.4,
        borderRadius: 6,
        padding: 0,
        paddingHorizontal: 10,

    }
})