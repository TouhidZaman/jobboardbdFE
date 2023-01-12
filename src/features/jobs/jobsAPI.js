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
            providesTags: ["job"]
        }),
        applyJob: builder.mutation({
            query: (applyData) => ({
                url: "apply",
                method: "PATCH",
                body: applyData
            }),
            invalidatesTags: ["job", "appliedJobs"]
        }),
        getAppliedJobs: builder.query({
            query: (cEmail) => `applied-jobs/${cEmail}`,
            providesTags: ["appliedJobs"]
        }),
        getMyJobs: builder.query({
            query: (employerId) => `my-jobs/${employerId}`,
            providesTags: ["myJobs"]
        }),
    })
})

export const { 
    useAddJobMutation, 
    useGetJobsQuery, 
    useGetJobByIdQuery, 
    useApplyJobMutation,
    useGetAppliedJobsQuery,
    useGetMyJobsQuery
} = jobsAPI;