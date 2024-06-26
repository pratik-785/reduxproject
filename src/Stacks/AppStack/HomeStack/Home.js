import { ActivityIndicator, FlatList, Image, StyleSheet, Text, Modal, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Dimensions, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addProduct, edit, editProduct, getProducts, openMenuOption, removeFromCart, removeProduct, setSelectedById, setSelectedId } from '../../../Feature/todo/todoSlice';
import { useNavigation } from '@react-navigation/native';
import { arrData } from '../../../Data/Data';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-snap-carousel';
import LottieView from 'lottie-react-native';

const Home = () => {
  const cartAnimation = useRef(new Animated.Value(0)).current;
  const [startAni, setStartAni] = useState(false)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const [object, setObject] = useState({})
  const [titleValue, setTitleValue] = useState(); /// This is for addd todo not for edit todo
  const [showDotView, setShowDotView] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addNewTitle, setAddNewTitle] = useState("");
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  console.log("2454444444444444444444", data)
  const orderData = useSelector(state => state.orderData);
  console.log("2555555555555555555551111", orderData)
  const selectedId = useSelector(state => state.selectedId);
  const status = useSelector(state => state.status);
  const editTitle = useSelector(state => state.editTitle);
  const cartData = useSelector(state => state.cartData);
  const cartId = useSelector(state => state.cartId);
  const carouselRef = useRef();

  const handleTitle = () => {
    dispatch(addProduct(titleValue));
    setTitleValue('');
  }

  const handleShowOption = (item) => {
    dispatch(openMenuOption({id: item?.id, value: !selectedId?.[item.id]}));
  }

  const handleEdit = (item) => {
    setModalVisible(true);
    setAddNewTitle(item?.title);
    setObject(item);
    dispatch(setSelectedById(item));
  }

  const handleDelete = (item) => {
    dispatch(removeProduct(item.id));
  }

  const handleModalSave = () => {
    let a = [{ name: addNewTitle, object: object }];
    dispatch(editProduct(a));
    // edit(addNewTitle, object)
    // editTitle = 'Pratik'
    setAddNewTitle('');
    setModalVisible(!modalVisible);
  }
  const handleAddToCart = (item) => {
    // console.log('Got item for add to cart', item);
    if (cartId[item?.id]) {
      dispatch(removeFromCart(item));

      Animated.spring(cartAnimation, {
        toValue: 1,
        // duration: 1000,
        useNativeDriver: true
      }).reset();
    } else {
      dispatch(addToCart(item));
      handleCartAnimation();
    }
  }

  const handleCartAnimation = () => {
    setStartAni(!startAni)
    Animated.spring(cartAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      friction: 1
    }).start();
  }

  const handleBuy = (item) => {
    navigation.navigate('BuyNow', item)
  }

  const renderCarousel = ({ item }) => {
    // console.log("itemmmm carousel", item.path)
    return (
      <View style={{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        margin: 0, padding: 0,
      }}>
        <Image source={{ uri: item.path }} style={{ height: '100%', width: '100%', resizeMode: 'center', }} />
      </View>
    )

  }
  const renderItem = ({ item }) => {
    let itemPrice = JSON.parse(item?.price);
    return (
      <View style={{ paddingVertical: 16, paddingHorizontal: 6, height: 520, backgroundColor: '#fff', width: '100%', borderRadius: 4, marginVertical: 2, alignSelf: 'center' }}>
        <View style={{ height: '56%', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <Carousel
            ref={carouselRef}
            data={item?.image}
            renderItem={renderCarousel}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
          />
          {/* <Image src={item?.image} style={{ height: '90%', resizeMode: 'contain', width: '90%' }} /> */}
          <TouchableOpacity onPress={() => handleShowOption(item)} style={{ position: 'absolute', top: 1, right: 4 }}>
            <Entypo name="dots-three-vertical" size={18} color={"#000"} />
          </TouchableOpacity>
          {selectedId?.[item?.id] &&
            <View style={{ height: 80, width: '30%', justifyContent: 'space-between', borderWidth: 1, borderColor: '#ddd', elevation: 3, borderRadius: 4, backgroundColor: '#fff', position: 'absolute', top: 18, right: 16 }}>
              <TouchableOpacity onPress={() => handleDelete(item)} style={{ width: '100%', justifyContent: 'center', paddingHorizontal: 6, height: '50%', }}>
                <Text style={{ fontSize: 16, color: "#000" }}>Delete</Text>
              </TouchableOpacity>
              <View style={{ height: 1, backgroundColor: '#bbb', width: '100%' }} />
              <TouchableOpacity onPress={() => handleEdit(item)} style={{ width: '100%', justifyContent: 'center', paddingHorizontal: 6, height: '50%', }}>
                <Text style={{ fontSize: 16, color: "#000" }}>Update</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
        <View style={{ height: '44%', }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: '500', color: '#000' }} numberOfLines={1}>{item?.title}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 14, marginTop: 6, color: '#000' }} numberOfLines={3}>{item?.description}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <FontAwesome name="rupee" size={16} color={"#000"} style={{ marginTop: 4 }} />
            <Text style={{ fontSize: 20, marginRight: 4, fontWeight: '600', color: '#000' }} > {itemPrice?.toLocaleString('en-IN')}</Text>
          </View>
          <TouchableOpacity onPress={() => handleBuy(item)} style={{ marginTop: 8, width: '100%', borderRadius: 4, backgroundColor: 'orange', height: 40, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
            {/* <FontAwesome name="rupee" size={16} color={"#000"} style={{marginTop:4}} /> */}
            <Text style={{ fontSize: 20, marginRight: 4, fontWeight: '600', color: '#fff' }} > Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAddToCart(item)} style={{ marginTop: 6, borderRadius: 4, width: '100%', backgroundColor: 'red', height: 40, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
            {/* <FontAwesome name="rupee" size={16} color={"#fff"} style={{marginTop:4}} /> */}
            {cartId[item.id] ?
              <Text style={{ fontSize: 20, marginRight: 4, fontWeight: '600', color: '#fff' }} > Remove from cart</Text>
              :
              <Text style={{ fontSize: 20, marginRight: 4, fontWeight: '600', color: '#fff' }} > Add to cart</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <>
      {status === 'loading' ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={40} color={'red'} />
        </View>
        :
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', height: 48, marginBottom: 10, alignItems: 'center', elevation: 3, width: '100%', paddingHorizontal: 10, }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>Online shopping</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CartProducts')} style={{ position: 'relative' }}>
              {cartData?.length !== 0 &&
                <View style={{ position: 'absolute', top: -6, right: -6, backgroundColor: 'red', width: 16, height: 16, zIndex: 1, alignItems: 'center', borderRadius: 10 }}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>{cartData?.length}</Text>
                </View>}
              {/* <Animated.View style={[{}, {
                transform: [{
                  translateX: cartAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 4]
                  })
                }
                ]
              }]}> */}
              <Feather name="shopping-bag" size={24} color="#000" />
              {/* </Animated.View> */}
              {/* <View style={{backgroundColor:'red',height:50, width:50}}> */}
              {/* <LottieView source={require('../../../Constants/Gif/Animation - 1713532579101.json')} style={{ height: 50, width: 50, }} autoPlay /> */}
              {/* </View> */}

            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, width: '100%' }}>
            {data.length !== 0 ?

              <FlatList data={data} renderItem={renderItem} />
              :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, color: '#000' }}>No data added.</Text>
              </View>
            }
            <TouchableOpacity onPress={() => navigation.navigate('AddProducts')} style={{ position: 'absolute', right: 20, bottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 40, width: 50, height: 50, backgroundColor: 'red' }}>
              <Entypo name='plus' size={30} color="#fff" />
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
                      <Text style={styles.modalText}>{object?.title}</Text>
                    </View>
                    {Object.keys(object).length !== 0 &&
                      <View style={{ width: '30%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Image source={{ uri: object?.image[0]?.path }} style={{ width: 40, height: 50, resizeMode: 'center' }} />
                      </View>
                    }
                  </View>
                  <View style={{ height: 30, width: '100%', marginTop: 10 }}>
                    <TextInput value={addNewTitle} onChangeText={(e) => setAddNewTitle(e)} placeholder='Edit title' style={{ height: 30, borderWidth: 0.5, padding: 0, paddingHorizontal: 10 }} />
                  </View>
                  <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => handleModalSave()}>
                    <Text style={styles.textStyle}>Save</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </Modal>

          </View>

        </>
      }
    </>
  )
}

export default Home

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
    height: 300,
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
    borderRadius: 2,
    width: '60%',
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
    fontSize: 14,
    fontWeight: '600', color: '#000'
  },
})