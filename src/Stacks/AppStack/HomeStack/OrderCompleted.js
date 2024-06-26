import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const OrderCompleted = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const txtAnimation = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  const [animationComp, setAnimationComp] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      // setAnimationComp(true)
      startAnimation()
    }, 2000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      // setAnimationComp(true)
      startTxtAnimation()
    }, 1000);
  }, []);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }
  const startTxtAnimation = () => {
    Animated.timing(txtAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView source={require('../../../Constants/Gif/completedOrder.json')} style={{ height: 350, width: 350, }} autoPlay loop={false} />
      {/* {animationComp && */}
      <Animated.Text style={[{ fontSize: 20, fontWeight: '600', opacity: txtAnimation, color: '#000' }, {
        transform: [{
          translateY: txtAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -90]
          }),

        }]
      }]}>
        Order placed successfully
      </Animated.Text>
      <Animated.View style={[{ position: 'absolute', bottom: -50, flexDirection: 'row', width: '100%', justifyContent: 'space-around' }, {
        transform: [{
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -60]
          })
        }]
      }]}>
        <TouchableOpacity onPressIn={() => navigation.navigate('Home')} style={{ width: '98%', backgroundColor: 'orange', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 3 }} onPress={() => navigation.navigate('Home')}>
          <Text style={{ fontSize: 18, color: '#fff' }}>Done</Text>
        </TouchableOpacity>
      </Animated.View>
      {/* } */}
    </View>
  )
}

export default OrderCompleted;

const styles = StyleSheet.create({});