import apiSlice from "features/api/apiSlice";
import { getUser } from "./authSlice";

const authAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (user) => ({
                url: "users",
                method: "POST",
                body: user
            }),
            async onQueryStarted(user, { dispatch, queryFulfilled }) {
                try {
                    //   const { data } = await queryFulfilled
                    //   console.log("response from the backend", data)
                    await queryFulfilled
                    // `onSuccess` side-effect
                    dispatch(getUser(user.email))
                } catch (err) {
                  // `onError` side-effect
                }
              },
        })
    })
})

export const { useAddUserMutation } = authAPI;