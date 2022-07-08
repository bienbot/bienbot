import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./guildSlice";

export const guildStore = configureStore({
    reducer: {
        data: dataReducer,
    },
});
