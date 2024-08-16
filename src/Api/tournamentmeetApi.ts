import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tournamentmeetItemApi = createApi({
    reducerPath: "tournamentmeetItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7152/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["TournamentMeet"],
    endpoints: (builder) => ({
        getTournamentMeet: builder.query({
            query: () => ({
              url: "api/TournamentMeet",
            }),
            providesTags: ["TournamentMeet"],
          }),
          getTournamentMeetById: builder.query({
            query: (id) => ({
              url: `api/TournamentMeet/${id}`,
            }),
            providesTags: ["TournamentMeet"],
          }),
          createTournamentMeet: builder.mutation({
            query: (data) => ({
              url: "api/TournamentMeet",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["TournamentMeet"],
          }),
          updateTournamentMeet: builder.mutation({
            query: ({ data, id }) => ({
              url: "api/TournamentMeet/" + id,
              method: "PUT",
              body: data,
            }),
            invalidatesTags: ["TournamentMeet"],
          }),
          deleteTournamentMeet: builder.mutation({
            query: (id) => ({
              url: "api/TournamentMeet/" + id,
              method: "DELETE",
            }),
            invalidatesTags: ["TournamentMeet"],
          }),
        }),
});

export const {
    useGetTournamentMeetQuery,
    useGetTournamentMeetByIdQuery,
    useCreateTournamentMeetMutation,
    useUpdateTournamentMeetMutation,
    useDeleteTournamentMeetMutation,
  } = tournamentmeetItemApi;
  export default tournamentmeetItemApi;