import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        email: "",
        role: ""
    },
    isLoading: true,
    isError: false,
    error: ""
}

const authSlice = createSlice({
    name:"auth",
    initialState,
})

export default authSlice.reducer