import { ActivityIndicator, Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addQuantity, placeOrderFunc } from '../../../Feature/todo/todoSlice';

const OrderDetails = (props) => {
  let data = props.route.params.data;
  let navigation = props.navigation;
  let selectedPaymentMethod = props.route.params.value;
  const [loading, setLoading] = useState(false);
  const mainArr = useSelector(state => state.data);
  const orderData = useSelector(state => state.orderData);
  const [objectData, setObjectData] = useState({});
  const firstImgOfProduct = data?.image === undefined ? 'https://staroutloud.wordpress.com/wp-content/uploads/2017/02/12393679_149467882082197_310481006_n.jpg' : data?.image[0]?.path;

  useEffect(() => {
    getSelectedProdut();
  }, [objectData]);

  const getSelectedProdut = async () => {
    // let mainId = mainData.map((e) => e.id)
    setLoading(true)
    const matchObject = await mainArr.find(obj => obj.id === data.id);
    setObjectData(matchObject);
    // setImage(data)
    setLoading(false)
  };

  const dispatch = useDispatch()
  const addQuantityLoader = useSelector(state => state.addQuantityLoader);

  let address = 'Pratik Gadge, Droupadi park, Savedi, Ahmednagar';

  let date = new Date();
  let dt = date.setDate(date.getDate() + 6);
  let sevenDayBefore = moment(dt).utc().format('D MMM YYYY')

  const [quantity, setQuantity] = useState(data?.count);
  const [price, setPrice] = useState(data?.fixedPrice);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOrder = () => {
    let sendData = { orderCount: JSON.parse(quantity), orderPrice: JSON.parse(price), data: objectData, paymentMethod: selectedPaymentMethod };
    dispatch(placeOrderFunc(sendData));
    navigation.navigate('OrderCompleted')
  }

  const handleModalSave = () => {
    // console.log("2666666666666", objectData.id);
    let dd = quantity * price;
    setPrice(dd)
    setModalVisible(false);
    // let sendData = { quantity: quantity, orderId: objectData?.id, orderCount: objectData?.count, orderFixedPrice: objectData?.fixedPrice, orderPrice: objectData?.price };
    // let cc = JSON.parse(quantity)
    // dispatch(addQuantity(sendData));

  }

  return (
    <>
      {loading ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={40} color={'red'} />
        </View>
        :
        <View style={{ flex: 1, padding: 10 }} >
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: '600', color: '#000' }}>OrderDetails</Text>
          </View>

          <View style={{ height: 200, borderRadius: 4, borderWidth: 1, backgroundColor: '#fff', borderColor: '#ccc' }}>
            <View style={{ height: '30%', borderBottomWidth: 1, borderColor: '#ccc', justifyContent: 'center', paddingHorizontal: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: "#222" }} numberOfLines={1} >Shiping to: {address} </Text>
            </View>
            <View style={{ height: '70%', padding: 12, borderBottomWidth: 1, borderColor: '#ccc' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#666', fontSize: 16, fontWeight: '600' }}>items:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons name="currency-rupee" size={12} />
                  <Text style={{ color: '#666', fontSize: 16, fontWeight: '600' }}>{price.toLocaleString('en-IN')}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between' }}>
                <Text style={{ color: '#666', fontSize: 16, fontWeight: '600' }}>Delivery:</Text>
                {objectData?.price < 500 ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="currency-rupee" size={12} />
                    <Text style={{ color: '#666', fontSize: 16, fontWeight: '600' }}>40</Text>
                  </View>
                  :
                  <Text style={{ color: 'green', fontSize: 16, fontWeight: '600' }}>Free</Text>
                }
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between' }}>
                <Text style={{ color: '#000', fontSize: 20, fontWeight: '600' }}>Order Total:</Text>
                {objectData?.price < 1500 ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="currency-rupee" size={14} color="green" />
                    <Text style={{ color: 'green', fontSize: 20, fontWeight: '600' }}>{(Number(price) + 40).toLocaleString('en-IN')}</Text>
                  </View>
                  :
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="currency-rupee" size={14} />
                    <Text style={{ color: 'green', fontSize: 20, fontWeight: '600' }}>{price.toLocaleString('en-IN')}</Text>
                  </View>
                }
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: '#fff', marginVertical: 4, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 12 }}>
            <View style={{ paddingVertical: 8, backgroundColor: '#fff' }}>
              <Text style={{ color: "green", fontWeight: '600', fontSize: 20 }}>Arriving {sevenDayBefore}</Text>
            </View>
            <View style={{ width: '100%', justifyContent: 'space-between' }}>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '30%' }}>
                  {/* <Image source={{ uri: data?.image[0]?.path }} style={{ height: 80, width: 80, resizeMode: 'center' }} /> */}
                  <Image source={{ uri: firstImgOfProduct }} style={{ height: 80, width: 80, resizeMode: 'center' }} />
                </View>
                <View style={{ width: '70%' }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>{objectData?.title}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="currency-rupee" size={14} color="green" />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'green' }}>{objectData?.price?.toLocaleString('en-IN')}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={{ height: 40, marginTop: 10, paddingHorizontal: 10, borderRadius: 6, flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee' }}>
                <Text style={{ fontSize: 16, color: '#000' }}>Quantity: {quantity}</Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <KeyboardAvoidingView behavior={"padding"} style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
                      <View style={{ width: '70%', }}>
                        <Text style={styles.modalText}>Add quantity</Text>

                      </View>
                    </View>
                    <View style={{ height: 30, width: '100%', marginTop: 10 }}>
                      <TextInput keyboardType='numeric' value={quantity} maxLength={2} onChangeText={(e) => setQuantity(e)} placeholder='Add quantity' style={{ height: 30, borderBottomWidth: 0.5, padding: 0, paddingHorizontal: 10 }} />
                    </View>
                    <TouchableOpacity
                      style={[styles.button]}
                      onPress={() => handleModalSave()}>
                      {addQuantityLoader ?
                        // <View></View>
                        <ActivityIndicator size={16} color={'#fff'} />
                        :
                        <Text style={styles.textStyle}>Save</Text>
                      }
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            </View>
          </View>

          <TouchableOpacity onPress={() => handleOrder()} style={{ position: 'absolute', bottom: 10, borderRadius: 4, backgroundColor: 'orange', width: '100%', alignSelf: 'center', height: 42, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>Place your holder</Text>
          </TouchableOpacity>
        </View>
      }
    </>
  )
}

export default OrderDetails;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    height: 200,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    width: '100%',
    padding: 10,
    elevation: 2,
    backgroundColor: 'red',
    marginTop: 20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: '600', color: '#000'
  },
});

