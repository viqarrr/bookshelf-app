import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    page: 1,
  },
  reducers: {
    setBooks(state, action) {
      state.books = [...state.books, ...action.payload]
    },
    setClearBooks(state, action) {
      state.books = [];
    },
    setPage(state, action) {
      state.page++;
    },
  },
});

export const { setBooks, setClearBooks, setPage } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
