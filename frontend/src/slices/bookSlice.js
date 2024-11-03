import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    page: 1,
  },
  reducers: {
    setBooks(state, action) {
      state.books.push(...action.payload);
    },
    clearBooks(state) {
      state.books = [];
      state.page = 1;
    },
    setPage(state) {
      state.page++;
    },
  },
});

export const { setBooks, clearBooks, setPage } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
