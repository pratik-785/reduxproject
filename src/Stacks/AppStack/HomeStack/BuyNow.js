import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { RadioButton } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import { continueFromBuy } from '../../../Feature/todo/todoSlice';

const BuyNow = (props) => {
    // console.log("propsssss", props)
    const data = props.route.params
    const mainData = useSelector(state => state.data);
    const [objectData, setObjectData] = useState({});
    useEffect(() => {
        getSelectedProdut()
    })

    const getSelectedProdut = async () => {
        // let mainId = mainData.map((e) => e.id)
        const matchObject = await mainData.find(obj => obj.id === data.id);
        setObjectData(matchObject)
    }
    const navigation = props.navigation;
    const [checkboxValue, setCheckboxValue] = useState('paywithapp')
    const dispatch = useDispatch()
    const handleContinue = () => {
        // let sendData = { data: data, value: checkboxValue };
        // dispatch(continueFromBuy(sendData));
        navigation.navigate('OrderDetails', { data: data, value: checkboxValue })
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ marginVertical: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: "#000" }}>Selected a payment method</Text>
            </View>
            <TouchableOpacity onPress={() => handleContinue()} style={{ width: '100%', borderRadius: 6, marginVertical: 10, height: 40, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: "#000", fontSize: 16, }}>Continue</Text>
            </TouchableOpacity>
            <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>Recommended</Text>
            </View>
            <RadioButton.Group onValueChange={newValue => setCheckboxValue(newValue)} value={checkboxValue}>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
                <View style={{ width: '100%', backgroundColor: '#fff', justifyContent: 'space-between', borderRadius: 2, height: 200, borderWidth: checkboxValue === undefined && validateAfterSubmit === true ? 0.7 : null, borderColor: checkboxValue === undefined && validateAfterSubmit === true ? 'red' : null }}>
                    {/* <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: '500', color: '#000' }}>Source -</Text> */}
                    <View style={styles.recommendedContainer}>
                        <View style={{ width: '14%', height: '100%', }}>
                            <RadioButton value="paywithapp" uncheckedColor={'#888'} color={'red'} />
                        </View>
                        <View style={{ width: '72%', height: '100%', marginTop: 6 }}>
                            <Text style={{ fontSize: 16, color: '#222' }}>Pay with our app</Text>
                        </View>
                        <View style={{ width: '14%', height: '100%', alignItems: 'center', marginTop: 6 }}>
                            <Text style={{ fontSize: 14, color: '#222', }}>Pay </Text>
                        </View>
                    </View>
                    <View style={styles.recommendedContainer}>
                        <View style={{ width: '14%', height: '100%', }}>
                            <RadioButton value="cashondelivery" uncheckedColor={'#888'} color={'red'} />
                        </View>
                        <View style={{ width: '72%', height: '100%', }}>
                            <Text style={{ fontSize: 16, color: '#222', marginTop: 6 }}>Cash on Delivery</Text>
                        </View>
                        <View style={{ width: '14%', height: '100%', alignItems: 'center', marginTop: 6 }}>
                            <Ionicons name="cash-outline" size={20} color="#000" />
                        </View>
                    </View>
                    <View style={styles.recommendedContainer}>
                        <View style={{ width: '14%', height: '100%', }}>
                            <RadioButton value="upi" uncheckedColor={'#888'} color={'red'} />
                        </View>
                        <View style={{ width: '72%', height: '100%', marginTop: 6 }}>
                            <Text style={{ fontSize: 16, color: '#222', }}>Pay with upi</Text>
                        </View>
                        <View style={{ width: '14%', height: '100%', alignItems: 'center', marginTop: 6 }}>
                            <AntDesign name="qrcode" size={20} color="#000" />
                        </View>
                    </View>
                </View>
                {/* </View> */}
                {/* <Text style={{color:'#000'}}>dfdf</Text> */}
                {/* {checkboxValue === '' && validateAfterSubmit === true && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <MaterialIcons name='error-outline' size={10} color={'red'} style={{ marginHorizontal: 5 }} />
                            <Text style={{ color: 'red', fontSize: 10 }}>Required</Text>
                        </View>
                    )
                    } */}
            </RadioButton.Group>
        </View>
    )
}

export default BuyNow

const styles = StyleSheet.create({
    recommendedContainer: { flexDirection: 'row', borderColor: '#ddd', borderWidth: 1, borderRadius: 4, paddingVertical: 10, height: '33%' }
})