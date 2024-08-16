import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: [],
  search: "",
};

export const infoItemSlice = createSlice({
  name: "info",
  initialState: initialState,
  reducers: {
    setinfo: (state, action) => {
      state.info = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setinfo, setSearchItem } =infoItemSlice.actions;
export const infoItemReducer = infoItemSlice.reducer;
