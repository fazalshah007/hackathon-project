import { configureStore } from "@reduxjs/toolkit";
import asyncTaskSlice from './slices/asyncTaskSlice'

const store = configureStore({
    reducer:{
        asyncTask: asyncTaskSlice
    }
});

export default store;