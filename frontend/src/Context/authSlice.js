import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    isLoggedIn: true,
    isManager: true,
    isAdmin: true,
    isApproved: false,

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
        logOut: (state, action) => {
            state.isAdmin = false;
            state.isApproved = false;
            state.isLoggedIn = false;
            state.isManager = false;
        }
    }
})

export const { setLoggedIn, setIsAdmin, setIsManager, setIsApproved, logOut } = authSlice.actions;
export default authSlice.reducer;