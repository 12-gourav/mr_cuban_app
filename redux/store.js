import {configureStore} from "@reduxjs/toolkit";
import { orderReducer, userReducer } from "./reducer";



export const store = configureStore({
    reducer:{
        user:userReducer,
        order:orderReducer
    }
})