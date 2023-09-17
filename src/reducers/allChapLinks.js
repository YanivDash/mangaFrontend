import { createSlice } from "@reduxjs/toolkit";

const allChapLinksSlice = createSlice({
  name: "allChapLinks",
  initialState: {
    allChapLinks: [],
  },
  reducers: {
    allChapLinksAdd(state, action) {
      state.allChapLinks = action.payload;
    },
  },
});

export const allChapLinksReducer = allChapLinksSlice.reducer;

export const { allChapLinksAdd } = allChapLinksSlice.actions;
