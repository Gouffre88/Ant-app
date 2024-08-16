import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tournamentmeetteamItemApi = createApi({
    reducerPath: "tournamentmeetteamItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7152/",
     // baseUrl: "http://asutp-web-001:7152/",
     prepareHeaders: (headers: Headers, api) => {
        const token = localStorage.getItem("token");
        token && headers.append("Authorization", "Bearer " + token);
      },
    }),
    tagTypes: ["TournamentMeetTeam"],
    endpoints: (builder) => ({
        getTournamentMeetTeam: builder.query({
            query: () => ({
              url: "api/TournamentMeetTeam",
            }),
            providesTags: ["TournamentMeetTeam"],
          }),
          getTournamentMeetTeamById: builder.query({
            query: (id) => ({
              url: `api/TournamentMeetTeam/${id}`,
            }),
            providesTags: ["TournamentMeetTeam"],
          }),
          createTournamentMeetTeam: builder.mutation({
            query: (data) => ({
              url: "api/TournamentMeetTeam",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["TournamentMeetTeam"],
          }),
          updateTournamentMeetTeam: builder.mutation({
            query: ({ data, id }) => ({
              url: "api/TournamentMeetTeam/" + id,
              method: "PUT",
              body: data,
            }),
            invalidatesTags: ["TournamentMeetTeam"],
          }),
          deleteTournamentMeetTeam: builder.mutation({
            query: (id) => ({
              url: "api/TournamentMeetTeam/" + id,
              method: "DELETE",
            }),
            invalidatesTags: ["TournamentMeetTeam"],
          }),
        }),
});

export const {
    useGetTournamentMeetTeamQuery,
    useGetTournamentMeetTeamByIdQuery,
    useCreateTournamentMeetTeamMutation,
    useUpdateTournamentMeetTeamMutation,
    useDeleteTournamentMeetTeamMutation,
  } = tournamentmeetteamItemApi;
  export default tournamentmeetteamItemApi;