import dataReducer from "./guildSlice";
import { configureStore } from "@reduxjs/toolkit";

export const guildStore = configureStore({
    reducer: {
        data: dataReducer,
    },
});
