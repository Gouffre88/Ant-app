import { createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery ({
       // baseUrl: "https://localhost:7032/api",
        baseUrl: "http://asutp-web-001:7032/api",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation ({
            query: (userData) => ({
                url: "authApi/register",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: userData
            }),
        }),

        loginUser: builder.mutation ({
            query: (userCredentials) => ({
                url: "authApi/login",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: userCredentials
            }),
        }),
    }),
});

export const {useRegisterUserMutation, useLoginUserMutation} = authApi;
export default authApi;

