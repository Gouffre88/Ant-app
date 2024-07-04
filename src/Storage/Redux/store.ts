import { configureStore } from "@reduxjs/toolkit";
import { authApi, gameItemApi} from "../../Api";
import { userAuthReducer } from "./userAuthSlice";
import { gameItemReducer } from "./gameItemSlice";


const store = configureStore ({
    reducer:{
        gameItemStore: gameItemReducer,
        userAuthStore: userAuthReducer,
        [gameItemApi.reducerPath]: gameItemApi.reducer,
        [authApi.reducerPath]: authApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat (authApi.middleware)
            .concat (gameItemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;