import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    isLoggedIn: false,
    isManager: false,
    isAdmin: false,
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