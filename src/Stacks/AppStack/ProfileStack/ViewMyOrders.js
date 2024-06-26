import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { removeFromOrders } from '../../../Feature/todo/todoSlice';

const ViewMyOrders = () => {
  const orderData = useSelector(state => state.orderData);
  const [showAlert, setShowAlert] = useState(false);
  const [orderObject, setOrderObject] = useState({});
  const [total, setTotal] = useState();
  console.log('tottle', typeof (String(total)))
  const dispatch = useDispatch();


  useEffect(() => {
    func()
  }, [total, orderData])
  const func = () => {
    let dd = orderData.map((e) => e.price)
    let tt = dd.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    setTotal(tt)
  }

  const handleShowAlert = (item) => {
    setOrderObject(item)
    setShowAlert(true)
  }
  const handleConfirm = () => {
    // console.log("itemmmm idddd",orderObject.id);
    dispatch(removeFromOrders(orderObject?.id))
    setShowAlert(false)
  }

  const renderItem = ({ item }) => {
    const firstImgOfProduct = item?.image === undefined ? 'https://staroutloud.wordpress.com/wp-content/uploads/2017/02/12393679_149467882082197_310481006_n.jpg' : item?.image[0]?.path;
    return (
      <View style={{ minHeight: 200, backgroundColor: '#fff', width: '100%', padding: 10, marginVertical: 4, paddingVertical: 16 }}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ width: '30%', height: 120 }}>
            <Image source={{ uri: firstImgOfProduct }} style={{
              flex: 1,
              width: '70%',
              height: '80%',
              aspectRatio: 0.7,
              resizeMode: 'stretch'
            }} />
          </View>
          <View style={{ paddingHorizontal: 10, width: '70%' }}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>{item.title}</Text>
            <Text style={{ fontSize: 14, color: '#000' }}>{item.description}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
              <FontAwesome name="rupee" size={16} color={"#000"} style={{ marginTop: 1, marginRight: 2 }} />
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>{item.price}</Text>
            </View>
            <View style={{ marginTop: 4, flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, color: "#000" }}>Quantity: </Text>
              <Text style={{ fontSize: 16, color: "#000", fontWeight: '600' }}>{item.count}</Text>
            </View>
            <View style={{ marginTop: 4, flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, color: "#000", }}>Method: </Text>
              <Text style={{ fontSize: 16, color: "#000", fontWeight: '600' }}> {item.paymentMethod}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleShowAlert(item)} style={{ marginTop: 20, borderRadius: 3, justifyContent: 'center', alignItems: 'center', height: 36, backgroundColor: 'red', width: '100%', alignSelf: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    )

  }
  return (
    <View style={{ flex: 1, padding: 6 }}>
      <>
        {orderData.length === 0 ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: "#000" }}>No orders.</Text>
          </View>
          :
          <>
            <View style={{ height: '8%', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, flexDirection: 'row', width: "100%", backgroundColor: '#fff' }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>Your total </Text>
              <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <FontAwesome name="rupee" size={17} color={"#000"} style={{ marginRight: 4 }} />
                <Text style={{ fontSize: 21, fontWeight: '600', color: '#000' }}>{total.toLocaleString('en-IN')}</Text>
              </View>
            </View>
            <FlatList data={orderData} renderItem={renderItem} />
            <Modal
              animationType="slide"
              transparent={true}
              visible={showAlert}
              onRequestClose={() => {
                setShowAlert(!showAlert);
              }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <View style={{ backgroundColor: '#fff', height: 160, width: 300, justifyContent: 'space-between', borderRadius: 4, paddingHorizontal: 10, paddingVertical: 16 }}>
                  <View style={{}}>
                    <Text style={{ fontSize: 22, fontWeight: '600', color: '#000' }}>Are you sure want to delete</Text>
                  </View>
                  <View style={{ alignSelf: 'flex-end', flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => handleConfirm()} style={{ width: 70, height: 30, borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, color: "#000" }}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowAlert(false)} style={{ width: 60, marginLeft: 4, height: 30, borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, color: "#000" }}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        }
      </>
    </View>
  )
};

export default ViewMyOrders;

const styles = StyleSheet.create({});