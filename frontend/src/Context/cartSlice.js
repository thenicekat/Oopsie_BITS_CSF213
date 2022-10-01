import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    cart: [],
    totalQuantity: 0
}

export const cartSlice = createSlice({
    name: "Cart",
    initialCartState,
    reducers: {
        addToCart: (state, payload) => {
            state.totalQuantity += 1;
        },
        removeFromCart: (state, payload) => {
            state.totalQuantity -= 1;
        }
    }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;