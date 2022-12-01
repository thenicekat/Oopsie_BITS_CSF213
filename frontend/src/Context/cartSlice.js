import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    cart: {},
    totalQuantity: 0,
    money: 0
}

export const cartSlice = createSlice({
    name: "Cart",
    initialState: initialCartState,
    reducers: {
        addToCart: (state, { payload }) => {
            if(state.cart[payload.productId]){
                state.cart[payload.productId].quantity++;
            }else{
                state.cart[payload.productId] = {
                    ...payload,
                    quantity: 1
                }
            }
            state.totalQuantity += 1;
        },
        removeFromCart: (state, { payload }) => {
            if(state.cart[payload.productId].quantity > 1){
                state.cart[payload.productId].quantity--;
                state.totalQuantity -= 1;
            }else if(state.cart[payload.productId].quantity === 1){
                delete state.cart[payload.productId];
                state.totalQuantity -= 1;
            }
        },
        setMoney: (state, action) => {
            state.money = action.payload.money;
        },
        clearCart: (state, action) => {
            state.cart = {};
        }
    }
})

export const { addToCart, removeFromCart, setMoney, clearCart } = cartSlice.actions;
export default cartSlice.reducer;