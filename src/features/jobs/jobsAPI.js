import apiSlice from "features/api/apiSlice";

const jobsAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addJob: builder.mutation({
            query: (job) => ({
                url: "jobs",
                method: "POST",
                body: job
            }),
        })
    })
})

export const { useAddJobMutation } = jobsAPI;