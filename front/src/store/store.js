import { configureStore } from "@reduxjs/toolkit";
import StatusSlice from "./StatusSlice";

export const store = configureStore({
    reducer: {
        status: StatusSlice
    }
})