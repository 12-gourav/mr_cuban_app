import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  { isValid: false, user: null },
  (builder) => {
    builder
      .addCase("login", (state, action) => {
        state.isValid = true;
        state.user = action.payload;
      })
      .addCase("load", (state, action) => {
        state.isValid = true;
        state.user = action.payload;
      })
      .addCase("logout", (state, action) => {
        state.isValid = false;
        state.user = null;
      });
  }
);

export const orderReducer = createReducer({ isOrder: false }, (builder) => {
  builder
    .addCase("createOrder", (state, action) => {
      state.isOrder = action.payload;
    })
    .addCase("deleteOrder", (state, action) => {
      state.isOrder = action.payload;
    });
});
