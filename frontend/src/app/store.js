import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

export const appStore = configureStore({
    reducer: rootReducer,             //contains all reducers combined
    
    //default middleware for RTK query
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware),

})

//refreshing reinitialize the redux store, to make sure user info is always available while logged-in initializeApp will reftech user info by calling loadUser every time the app is reloaded and the store it in the state using userLoggedIn
const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, {forceRefetch: true}));
}

initializeApp();