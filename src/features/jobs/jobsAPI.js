import apiSlice from "features/api/apiSlice";

const jobsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addJob: builder.mutation({
      query: (job) => ({
        url: "jobs",
        method: "POST",
        body: job,
      }),
      invalidatesTags: ["jobs", "myJobs"],
    }),
    getJobs: builder.query({
      query: () => `jobs`,
      providesTags: ["jobs"],
    }),
    getJobById: builder.query({
      query: (jobId) => `jobs/${jobId}`,
      providesTags: ["job"],
    }),
    closeJobById: builder.mutation({
      query: (jobId) => ({
        url: `jobs/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobs", "myJobs"],
    }),
    applyJob: builder.mutation({
      query: ({ applyData, jobId }) => ({
        url: `apply/${jobId}`,
        method: "PATCH",
        body: applyData,
      }),
      invalidatesTags: ["job", "jobs", "appliedJobs"],
    }),
    getAppliedJobs: builder.query({
      query: (cEmail) => `applied-jobs/${cEmail}`,
      providesTags: ["appliedJobs"],
    }),
    getMyJobs: builder.query({
      query: (employerId) => `my-jobs/${employerId}`,
      providesTags: ["myJobs"],
    }),
  }),
});

export const {
  useAddJobMutation,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useApplyJobMutation,
  useGetAppliedJobsQuery,
  useGetMyJobsQuery,
  useCloseJobByIdMutation,
} = jobsAPI;
