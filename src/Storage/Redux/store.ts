import { configureStore } from "@reduxjs/toolkit";
import { authApi, fileApi, gameItemApi, newsItemsApi, countryItemApi, playerApi, tournamentItemApi, teamItemApi, infoApi, teamplayerItemApi, tournamentmeetItemApi, tournamentmeetteamItemApi} from "../../Api";
import { userAuthReducer } from "./userAuthSlice";
import { gameItemReducer } from "./gameItemSlice";
import { newsItemReducer } from "./newsItemSlice";
import { countryItemReducer } from "./countrySlice";
import { playerItemReducer } from "./playerSlice";
import { tournamentItemReducer } from "./TournamentSlice";
import { teamItemReducer } from "./TeamSlice";
import { infoItemReducer } from "./InfoSlice";
import { teamplayerItemReducer } from "./teamplayerSlice";
import { TournamentMeetItemReducer } from "./tournamentmeetSlice";
import { TournamentMeetTeamItemReducer } from "./tournamentmeetteamSlice";


const store = configureStore ({
    reducer:{
        gameItemStore: gameItemReducer,
        newsItemStore: newsItemReducer,
        userAuthStore: userAuthReducer,
        countryItemStore: countryItemReducer,
        playerItemStore: playerItemReducer,
        tournamentItemStore: tournamentItemReducer,
        teamItemStore: teamItemReducer,
        infoItemStore: infoItemReducer,
        teampleyerStore: teamplayerItemReducer,
        tournamentmeetStore: TournamentMeetItemReducer,
        tournamentmeetteamStore: TournamentMeetTeamItemReducer,
        [authApi.reducerPath]: authApi.reducer,
        [fileApi.reducerPath]: fileApi.reducer,
        [gameItemApi.reducerPath]: gameItemApi.reducer,
        [newsItemsApi.reducerPath]: newsItemsApi.reducer,
        [countryItemApi.reducerPath]: countryItemApi.reducer,
        [playerApi.reducerPath]: playerApi.reducer,
        [tournamentItemApi.reducerPath]: tournamentItemApi.reducer,
        [teamItemApi.reducerPath]: teamItemApi.reducer,
        [infoApi.reducerPath]: infoApi.reducer,
        [teamplayerItemApi.reducerPath]: teamplayerItemApi.reducer,
        [tournamentmeetItemApi.reducerPath]: tournamentmeetItemApi.reducer,
        [tournamentmeetteamItemApi.reducerPath]: tournamentmeetteamItemApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat (authApi.middleware)
            .concat(fileApi.middleware)
            .concat (gameItemApi.middleware)
            .concat (newsItemsApi.middleware)
            .concat (countryItemApi.middleware)
            .concat (playerApi.middleware)
            .concat (tournamentItemApi.middleware)
            .concat (teamItemApi.middleware)
            .concat (infoApi.middleware)
            .concat (teamplayerItemApi.middleware)
            .concat (tournamentmeetItemApi.middleware)
            .concat (tournamentmeetteamItemApi.middleware),
           
});

export type RootState = ReturnType<typeof store.getState>;

export default store;