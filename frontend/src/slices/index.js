import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modalSlice";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./apiSlice";
import { bookReducer } from "./bookSlice";

const store = configureStore({
  reducer:{
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalReducer,
    books: bookReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

export default store