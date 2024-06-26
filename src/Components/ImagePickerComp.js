import { FlatList, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';

import Carousel from 'react-native-snap-carousel';


const ImagePickerComp = ({ image, setImage, navigation }) => {
    console.log('iiiiiiiiiiii', image)
    const handleImagePick = () => {
        Keyboard.dismiss()
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true
        }).then(image => {
            setImage(image);
            console.log(image);
        });
    }


    return (
        <View style={{ width: '100%' }}>
            <TouchableOpacity onPress={() => handleImagePick()} style={{ flexDirection: 'row', width: '100%', height: 40, borderRadius: 6, paddingHorizontal: 10, borderWidth: 0.4, justifyContent: 'center', }}>
                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, color: "#888" }}>ImagePickerComp</Text>
                    {image !== undefined &&
                        <View style={{ height: 20, width: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 0.8, borderRadius: 10 }}>
                            <Text style={{ fontSize: 14, color: "#000", fontWeight: '600' }}>{image?.length}</Text>
                        </View>}
                </View>
            </TouchableOpacity>

            {/* <View style={{  width: '100%',}}> */}
            {/* {image?.map((e) => <RenderItem item={e} />)} */}
            {/* </View> */}
        </View>
    )
}

export default ImagePickerComp;

const styles = StyleSheet.create({});