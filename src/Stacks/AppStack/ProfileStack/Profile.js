import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Profile = ({navigation}) => {
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('ViewMyOrders')} style={{ width: '100%', height: 40, backgroundColor: '#fff', borderRadius: 4, elevation: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: "#000" }}>Your orders</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Calc')} style={{ width: '100%',marginTop:10, height: 40, backgroundColor: '#fff', borderRadius: 4, elevation: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: "#000" }}>Your Calc</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({})

// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React from 'react';
// import MapPolyfils from '../../../Components/Polyfills/MapPolyfils';
// import FilterPolyfil from '../../../Components/Polyfills/FilterPolyfil';

// const Profile = () => {

//     return (
//         <View style={{ flex: 1 }}>
//             <View style={{ height: '8%', justifyContent: 'center', alignItems: 'center' }}>
//                 <Text style={{ fontSize: 30, fontWeight: '600', color: '#000' }}>Polyfills</Text>
//             </View>
//             <View style={{ height: '90%', paddingHorizontal: 8, marginTop: '2%', width: '100%' }}>
//                 <MapPolyfils />
//                 <FilterPolyfil />
//             </View>
//         </View>
//     )
// }

// export default Profile;

// const styles = StyleSheet.create({});