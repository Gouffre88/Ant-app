import { configureStore } from "@reduxjs/toolkit";
import { authApi, fileApi, gameItemApi, newsItemsApi} from "../../Api";
import { userAuthReducer } from "./userAuthSlice";
import { gameItemReducer } from "./gameItemSlice";
import { newsItemReducer } from "./newsItemSlice";


const store = configureStore ({
    reducer:{
        gameItemStore: gameItemReducer,
        newsItemStore: newsItemReducer,
        userAuthStore: userAuthReducer,
        [authApi.reducerPath]: authApi.reducer,
        [fileApi.reducerPath]: fileApi.reducer,
        [gameItemApi.reducerPath]: gameItemApi.reducer,
        [newsItemsApi.reducerPath]: newsItemsApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat (authApi.middleware)
            .concat(fileApi.middleware)
            .concat (gameItemApi.middleware)
            .concat (newsItemsApi.middleware),
           
});

export type RootState = ReturnType<typeof store.getState>;

export default store;