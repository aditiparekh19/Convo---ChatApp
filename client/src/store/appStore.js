import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";

export const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});
