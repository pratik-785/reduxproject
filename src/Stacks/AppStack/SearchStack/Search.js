import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Search = () => {
    const [searchVal, setSearchVal] = useState('');
    // const data = useSelector(state => state.data);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [filterData, setFilterData] = useState([])
    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true)
            const api_url = "https://jsonplaceholder.typicode.com/posts";
            const response = await fetch(api_url);
            const result = await response.json();
            // console.log("result000", result)
            setData(result)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("errror", error)
        }
    }


    const renderItem = ({ item }) => {
        // count: 1,
        // title: action.payload.title,
        // image: action.payload.image,
        // category: action.payload.category,
        // price: action.payload.price,
        // fixedPrice: action.payload.price,
        // description: action.payload.description,
        const firstImgOfProduct = item?.image === undefined ? 'https://staroutloud.wordpress.com/wp-content/uploads/2017/02/12393679_149467882082197_310481006_n.jpg' : item?.image[0]?.path
        return (
            <View style={{ height: 130, borderRadius: 1, flexDirection: 'row', padding: 10, width: '100%', marginVertical: 2, borderWidth: 0.6, borderColor: '#bbb' }}>
                <View style={{ backgroundColor: 'blue', width: '30%', height: '100%' }}>
                    <Image source={{ uri: firstImgOfProduct }} style={{ height: '100%', width: '100%' }} />
                </View>
                <View style={{ width: '70%', paddingHorizontal: 12, height: '100%' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>{item?.title}</Text>
                    <Text style={{ fontSize: 12, marginVertical: 10, color: '#000' }}>{item?.description}</Text>
                    {/* <Text>${item?.price}</Text> */}
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, height: '100%', padding: 10 }}>
            {/* search area */}
            <View style={{ height: '6%', }}>
                <TextInput value={searchVal} onChangeText={(e) => setSearchVal(e)} style={{ width: '100%', borderRadius: 3, height: 34, borderWidth: 0.5 }} />
            </View>
            {/* OutPut list */}
            <View>
                <Text style={{fontSize:12, fontWeight:'600',color:'#000'}}>Random data</Text>
            </View>
            <View style={{ marginTop: 20, height: '92%' }}>
                {searchVal.length === 0 ?
                    <View style={{ justifyContent: 'center' }}><Text>Search....</Text></View>
                    :
                    <>
                        {loading ?
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <ActivityIndicator size={40} color={'red'} />
                            </View>
                            :
                            <FlatList data={searchVal?.length ? data?.filter(d => d?.title.toLowerCase()?.includes(searchVal?.toLowerCase())) : data} renderItem={renderItem} showsVerticalScrollIndicator={false} />
                        // {/* <FlatList data={data} renderItem={renderItem} /> */}


                        }
                    </>

                }
            </View>
        </View>
    )
}

export default Search;

const styles = StyleSheet.create({});