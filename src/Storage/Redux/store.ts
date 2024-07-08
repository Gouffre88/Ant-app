import { configureStore } from "@reduxjs/toolkit";
import { authApi, gameItemApi, newsItemsApi} from "../../Api";
import { userAuthReducer } from "./userAuthSlice";
import { gameItemReducer } from "./gameItemSlice";
import { newsItemReducer } from "./newsItemSlice";


const store = configureStore ({
    reducer:{
        gameItemStore: gameItemReducer,
        newsItemStore: newsItemReducer,
        userAuthStore: userAuthReducer,
        [gameItemApi.reducerPath]: gameItemApi.reducer,
        [newsItemsApi.reducerPath]: newsItemsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat (authApi.middleware)
            .concat (gameItemApi.middleware)
            .concat (newsItemsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;