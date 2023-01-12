import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL
        // baseUrl: "http://localhost:5000/"
    }),
    tagTypes: ["jobs", "job", "appliedJobs", "myJobs"],
    endpoints: () => ({})
})

export default apiSlice;