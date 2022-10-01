import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    counter: 0
}

export const cartSlice = createSlice({
    name: "Cart",
    initialCartState,
    reducers: {
        addToCart: (state, payload) => {
            state.counter += 1;
        }
    }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;