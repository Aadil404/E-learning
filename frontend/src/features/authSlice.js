import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

       //when user login this function will be called
       userLoggedIn: (state, action) => {
           state.user = action.payload;
           state.isAuthenticated = true;
       },

       //when user logout this function will be called    
       userLoggedOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
       }
    }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;