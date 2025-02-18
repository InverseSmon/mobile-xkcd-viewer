// store.ts
import { configureStore } from "@reduxjs/toolkit";
import comicReducer from "./comicSlice";

export const store = configureStore({
    reducer: {
        comic: comicReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
