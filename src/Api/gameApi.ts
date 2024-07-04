import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const gameItemApi = createApi({
    reducerPath: "gameItemApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://localhost:7050/",
    /*  prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },*/
    }),
    tagTypes: ["GameItems"],
    endpoints: (builder) => ({
      getGameItems: builder.query({
        query: () => ({
          url: "GameType",
        }),
        providesTags: ["GameItems"],
      }),
      getGameItemById: builder.query({
        query: (id) => ({
          url: `GameType/${id}`,
        }),
        providesTags: ["GameItems"],
      }),
      createGameItem: builder.mutation({
        query: (data) => ({
          url: "GameType",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["GameItems"],
      }),
      updateGameItem: builder.mutation({
        query: ({ data, id }) => ({
          url: "GameType/" + id,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["GameItems"],
      }),
      deleteGameItem: builder.mutation({
        query: (id) => ({
          url: "GameType/" + id,
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