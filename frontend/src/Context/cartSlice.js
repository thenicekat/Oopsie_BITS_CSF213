import { createSlice, current } from "@reduxjs/toolkit";

const initialCartState = {
    cart: {},
    totalQuantity: 0
}

export const cartSlice = createSlice({
    name: "Cart",
    initialState: initialCartState,
    reducers: {
        addToCart: (state, { payload }) => {
            if(state.cart[payload.id]){
                state.cart[payload.id].quantity++;
            }else{
                state.cart[payload.id] = {
                    ...payload,
                    quantity: 1
                }
            }
            state.totalQuantity += 1;
            console.log(current(state));
        },
        removeFromCart: (state, { payload }) => {
            if(state.cart[payload.id].quantity > 1){
                state.cart[payload.id].quantity--;
                state.totalQuantity -= 1;
            }else if(state.cart[payload.id].quantity === 1){
                delete state.cart[payload.id];
            }
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;