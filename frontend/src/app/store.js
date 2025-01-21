import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/app/authApi";

export const appStore = configureStore({
    reducer: rootReducer,
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),

})