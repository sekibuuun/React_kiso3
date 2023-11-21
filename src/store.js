import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { pageCounter } from "./redux/reducers";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pageCounter,
  },
});
