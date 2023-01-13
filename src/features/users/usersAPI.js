import apiSlice from "features/api/apiSlice";

const usersAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        getUserById: builder.query({
            query: (userId) => `users/${userId}`,
            providesTags: ["user"]
        }),
    })
})

export const { useGetUserByIdQuery } = usersAPI;