import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tournamentmeetteam: [],
  search: "",
};

export const tournamentmeetteamSlice = createSlice({
  name: "TournamentMeetTeam",
  initialState: initialState,
  reducers: {
    setTournamentMeetTeam: (state, action) => {
      state.tournamentmeetteam = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setTournamentMeetTeam, setSearchItem } = tournamentmeetteamSlice.actions;
export const TournamentMeetTeamItemReducer = tournamentmeetteamSlice.reducer;
