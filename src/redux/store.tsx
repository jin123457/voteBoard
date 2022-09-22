import { configureStore } from "@reduxjs/toolkit";
import voteResultReducer from "./voteReducer";
export const store = configureStore({
  reducer: {
    voteResultReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
