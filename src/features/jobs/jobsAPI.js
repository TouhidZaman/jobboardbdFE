import apiSlice from "features/api/apiSlice";

const jobsAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addJob: builder.mutation({
            query: (job) => ({
                url: "jobs",
                method: "POST",
                body: job
            }),
            invalidatesTags: ["jobs"]
        }),
        getJobs: builder.query({
            query: () => `jobs`,
            providesTags: ["jobs"]
        }),
        getJobById: builder.query({
            query: (jobId) => `jobs/${jobId}`,
        })
    })
})

export const { useAddJobMutation, useGetJobsQuery, useGetJobByIdQuery } = jobsAPI;