import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal',
  initialState:{
    add: false,
    edit: false
  }, 
  reducers:{
    addOpen(state, action){
      state.add = true
    },
    addClose(state, action){
      state.add = false
    },
    editOpen(state, action){
      state.edit = true
    },
    editClose(state, action){
      state.edit = false
    },
  }
})

export const {addOpen, addClose, editOpen, editClose} = modalSlice.actions
export const modalReducer = modalSlice.reducer
