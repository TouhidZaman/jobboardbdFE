import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL
    }),
    tagTypes: ["jobs", "job", "appliedJobs", "myJobs", "user"],
    endpoints: () => ({})
})

export default apiSlice;