import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
export const store = configureStore({
    reducer: {
        userState : userSlice
    },
    devTools: true
})