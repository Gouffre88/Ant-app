import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tournamentmeet: [],
  search: "",
};

export const tournamentmeetSlice = createSlice({
  name: "TournamentMeet",
  initialState: initialState,
  reducers: {
    setTournamentMeet: (state, action) => {
      state.tournamentmeet = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setTournamentMeet, setSearchItem } = tournamentmeetSlice.actions;
export const TournamentMeetItemReducer = tournamentmeetSlice.reducer;
