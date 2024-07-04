import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameItem: [],
  search: "",
};

export const gameItemSlice = createSlice({
  name: "GameItem",
  initialState: initialState,
  reducers: {
    setGameItem: (state, action) => {
      state.gameItem = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setGameItem, setSearchItem } = gameItemSlice.actions;
export const gameItemReducer = gameItemSlice.reducer;
