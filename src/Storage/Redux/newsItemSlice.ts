import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameItem: [],
  search: "",
};

export const newsItemSlice = createSlice({
  name: "InfoItem",
  initialState: initialState,
  reducers: {
    setNewsItem: (state, action) => {
      state.gameItem = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setNewsItem, setSearchItem } = newsItemSlice.actions;
export const newsItemReducer = newsItemSlice.reducer;
