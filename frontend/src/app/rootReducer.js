import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import { authApi } from "@/features/app/authApi";

//combine all reducers and send it to store
const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;