import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./guildDataSlice";

export const guildDataStore = configureStore({
    reducer: {
        data: dataReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
