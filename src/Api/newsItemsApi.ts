import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsItemsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://localhost:7152/",
     // baseUrl: "http://asutp-web-001:7152/",
       prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["InfoItems"],
    endpoints: (builder) => ({
      getNews: builder.query({
        query: () => ({
          url: "api/Info",
        }),
        providesTags: ["InfoItems"],
      }),
      getNewsItemId: builder.query({
        query: (id) => ({
          url: `api/Info/${id}`,
        }),
        providesTags: ["InfoItems"],
      }),
      createNewsItem: builder.mutation({
        query: (data) => ({
          url: "api/Info",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["InfoItems"],
      }),
      updateNewsItem: builder.mutation({
        query: ({ data, id }) => ({
          url: "api/Info/" + id,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["InfoItems"],
      }),
      deleteGameItem: builder.mutation({
        query: (id) => ({
          url: "api/Info/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["InfoItems"],
      }),
    }),
  });
  
  export const {
    useGetNewsQuery,
    useGetNewsItemIdQuery,
    useCreateNewsItemMutation,
    useUpdateNewsItemMutation,
    useDeleteGameItemMutation,
  } = newsItemsApi;
  export default newsItemsApi;