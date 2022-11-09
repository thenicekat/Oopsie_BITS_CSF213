import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    isLoggedIn: true,
    isAdmin: false
}

export const authSlice = createSlice({
    name: "Authentication",
    initialState: initialUserState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = true;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = true;
        },
    }
})

export const { setLoggedIn, setIsAdmin } = authSlice.actions;
export default authSlice.reducer;