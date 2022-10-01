import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    isLoggedIn: false,
    
}

export const authSlice = createSlice({
    name: "Authentication",
    initialUserState,
    reducers: {
        logIn: (state, action) => {

        }
    }
})