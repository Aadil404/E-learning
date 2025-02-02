import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";

//combine all reducers and send it to store
const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
});

export default rootReducer;