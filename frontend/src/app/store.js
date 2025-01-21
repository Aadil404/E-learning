import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";

export const appStore = configureStore({
    reducer: rootReducer,             //contains all reducers combined
    
    //default middleware for RTK query
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),

})