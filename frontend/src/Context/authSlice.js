import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    isLoggedIn: true,
    isManager: false,
    isAdmin: false,
    isApproved: false
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
        setIsManager: (state, action) => {
            state.isManager = true;
        },
        setIsApproved: (state, action) => {
            state.isApproved = true;
        },
    }
})

export const { setLoggedIn, setIsAdmin, setIsManager, setIsApproved } = authSlice.actions;
export default authSlice.reducer;