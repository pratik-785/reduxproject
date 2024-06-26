import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = {
    todos: [],
    status: 'idle',
    data: [],
    selectedId: {},
    editTitle: '',
    cartData: [],
    cartId: {},
    orderData: [],
    addQuantityLoader: false,
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        fetchProducts(state, action) {
            state.data = action.payload;
        },
        addProduct: (state, action) => {
            console.log("actionssss 1999", action.payload.title)
            const item = {
                id: nanoid(),
                count: 1,
                title: action.payload.title,
                image: action.payload.image,
                category: action.payload.category,
                price: action.payload.price,
                fixedPrice: action.payload.price,
                description: action.payload.description,
            };
            // console.log("itemmmmmmmmmmmm",item)
            state.data.push(item);
            // fetchProducts()
        },
        removeProduct: (state, action) => {
            state.data = state?.data?.filter((todo) =>
                todo?.id !== action?.payload
            );
            state.cartData = state?.cartData?.filter((todo) =>
                todo?.id !== action?.payload
            );

        },
        editProduct: (state, action) => {
            let name = action.payload.map((t) => t.name)
            let str = action.payload.map((e) => e.object.id)
            const editedObj = state.data.map((e) => {
                if (String(str) == e.id) {
                    return {
                        ...e,
                        title: name
                    }
                } else {
                    return e
                }
            })
            state.data = editedObj
        },
        openMenuOption: (state, action) => {
            let obj = { [action.payload?.id]: !state.selectedId[action.payload?.id] }
            // let obj = { [action.payload?.id]: true }
            Object.assign(state?.selectedId, obj);
            state.selectedId[action.payload.id] =  action.payload.value
        },
        setSelectedById: (state, action) => {
            let obj = { [action.payload?.id]: false }
            Object.assign(state?.selectedId, obj);
        },
        addToCart: (state, action) => {
            let obj = { [action.payload.id]: !state.cartId[action.payload.id] }
            Object.assign(state?.cartId, obj);
            let cartItem = {
                id: action.payload.id,
                count: 1,
                title: action.payload.title,
                image: action.payload.image,
                category: action.payload.category,
                price: action.payload.price,
                fixedPrice: action.payload.price,
                description: action.payload.description
            }
            state?.cartData.push(cartItem);

        },
        removeFromCart: (state, action) => {
            // This is for name changing on home screen add or remove cart
            let obj = { [action.payload.id]: !state.cartId[action.payload.id] }
            Object.assign(state?.cartId, obj)
            // filtered from cartData
            state.cartData = state.cartData.filter((e) =>
                e.id !== action.payload.id
            )
        },
        productIncreament: (state, action) => {
            let increamented = state.cartData.map((e) => {
                if (e.id === action.payload.id) {
                    return {
                        ...e,
                        count: action.payload.count + 1,
                        price: Number(action.payload.price) + Number(action.payload.fixedPrice)
                    }
                } else {
                    return e
                }
            })
            state.cartData = increamented;
        },
        productDecreament: (state, action) => {
            if (action.payload.count <= 1) {
                state.cartData = state.cartData.filter((e) =>
                    e.id !== action.payload.id
                )
                let obj = { [action.payload.id]: !state.cartId[action.payload.id] }
                Object.assign(state.cartId, obj)
            } else {
                let decreamented = state.cartData.map((e) => {
                    if (e.id === action.payload.id) {
                        // // if()
                        // if (e.id === action.payload.id && e.count < 1) {
                        //     console.log("count section calledddd.....")
                        //     state.cartData = state.cartData.filter((l) => {
                        //         l.id !== action.payload.id
                        //     })
                        // } else {
                        //     console.log('elseee calleddd....')
                        return {
                            ...e,
                            count: action.payload.count - 1,
                            price: Number(action.payload.price) - Number(action.payload.fixedPrice)
                        }
                        // }

                    } else {
                        return e
                    }
                })
                state.cartData = decreamented;
            }
        },
        continueFromBuy: (state, action) => {
            // // console.log('143333333333333333',action)
            // // state.orderData = action.payload.data
            // let dd = action.payload.value
            // let obj = action.payload.data
            // const newObj = { ...obj, orderPayment: dd };
            // state.orderData.push(newObj);
        },
        addQuantity: (state, action) => {
            console.log("orderrrrprciceeeee", action.payload.orderPrice)
            console.log("action quantityyyy", action.payload.quantity)
            let dd = Number(action.payload.orderPrice) * Number(action.payload.quantity)
            console.log("dddddddd 143333", dd)
            state.addQuantityLoader = true;
            let addValueToCount = state.data.map((e) => {
                if (e.id === action.payload.orderId) {
                    return {
                        ...e,
                        count: action.payload.quantity,
                        price: action.payload.orderFixedPrice * action.payload.quantity
                    }
                } else {
                    return e
                }
            });
            state.orderData = addValueToCount;
            console.log("addd valueee toooo countttt", addValueToCount)
            state.addQuantityLoader = false;
        },

        placeOrderFunc: (state, action) => {
            let objData = action.payload.data
            let price = action.payload.orderPrice
            let count = action.payload.orderCount
            let payment = action.payload.paymentMethod
            let obj = {
                id: objData.id,
                title: objData.title,
                price: price,
                count: count,
                image: objData.image,
                category: objData.category,
                fixedPrice: objData.price,
                description: objData.description,
                paymentMethod: payment
            };
            state.orderData.push(obj);

        },
        removeFromOrders: (state, action) => {
            state.orderData = state.orderData.filter((e) =>
                e.id !== action.payload
            )
        },

    },

    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getProducts.pending, (state, action) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(getProducts.fulfilled, (state, action) => {
    //             state.data = action.payload;
    //             state.status = 'idle'
    //         })
    //         .addCase(getProducts.rejected, (state, action) => {
    //             state.status = 'error'
    //         })
    // },

});

export const { fetchProducts, addProduct, placeOrderFunc, removeProduct, openMenuOption, selectedId, addQuantity, editProduct, setSelectedById, addToCart, removeFromCart, productIncreament, productDecreament, continueFromBuy, removeFromOrders } = todoSlice.actions;
export default todoSlice.reducer;


// export const getProducts = createAsyncThunk('data/get', async () => {
//     const data = await fetch('https://fakestoreapi.com/products')
//     const result = await data.json();
//     return result;
// })

// export const closeModal = (newTitle, objItem) => {

// }