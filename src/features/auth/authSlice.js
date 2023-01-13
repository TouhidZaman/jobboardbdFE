import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import auth from "../../firebase/firebase.config";

const initialState = {
    user: {
        email: "",
        role: ""
    },
    isLoading: true,
    isError: false,
    error: ""
}

export const createUser = createAsyncThunk("auth/createUser", async ({email, password}) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res?.user?.email;
})

export const loginUser = createAsyncThunk("auth/loginUser", async ({email, password}) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res?.user?.email;
})

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
    const res = await fetch(`${process.env.REACT_APP_baseURL}users-by-email/${email}`);
    const data = await res.json();
    if(data.status) {
        return data.data;
    } 
    return { email };
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        resetError: (state) => {
            state.isError=false;
            state.error="";
        },
        logOut: (state) => {
            state.user={
                email: "",
                role: ""
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading=true;
                state.isError=false;
            })
            .addCase(createUser.fulfilled, (state, {payload}) => {
                state.user.email=payload;
                state.isLoading=false;
                state.isError=false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading=false;
                state.isError=true;
                state.error=action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading=true;
                state.isError=false;
            })
            .addCase(loginUser.fulfilled, (state, {payload}) => {
                state.user.email=payload;
                state.isLoading=false;
                state.isError=false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading=false;
                state.isError=true;
                state.error=action.error.message;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading=true;
                state.isError=false;
            })
            .addCase(getUser.fulfilled, (state, {payload}) => {
                state.user={
                    ...state.user,
                    ...payload
                }
                state.isLoading=false;
                state.isError=false;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading=false;
                state.isError=true;
                state.error=action.error.message;
            })
    }
})

export const { resetError, logOut } = authSlice.actions

export default authSlice.reducer