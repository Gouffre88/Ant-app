import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const gameItemApi = createApi({
    reducerPath: "gameItemApi",
    baseQuery: fetchBaseQuery({
    //  baseUrl: "https://localhost:7152/",
      baseUrl: "http://asutp-web-001:7152/",
    /*  prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },*/
    }),
    tagTypes: ["GameItems"],
    endpoints: (builder) => ({
      getGameItems: builder.query({
        query: () => ({
          url: "api/GameType",
        }),
        providesTags: ["GameItems"],
      }),
      getGameItemById: builder.query({
        query: (id) => ({
          url: `api/GameType/${id}`,
        }),
        providesTags: ["GameItems"],
      }),
      createGameItem: builder.mutation({
        query: (data) => ({
          url: "api/GameType",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["GameItems"],
      }),
      updateGameItem: builder.mutation({
        query: ({ data, id }) => ({
          url: "api/GameType/" + id,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["GameItems"],
      }),
      deleteGameItem: builder.mutation({
        query: (id) => ({
          url: "api/GameType/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["GameItems"],
      }),
    }),
  });
  
  export const {
    useGetGameItemsQuery,
    useGetGameItemByIdQuery,
    useCreateGameItemMutation,
    useUpdateGameItemMutation,
    useDeleteGameItemMutation,
  } = gameItemApi;
  export default gameItemApi;