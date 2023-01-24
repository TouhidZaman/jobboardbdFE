import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keywords: ""
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addToSearchKeywords: (state, { payload }) => {
            state.keywords = payload;
        },
        clearSearch: (state) => {
            state.keywords = "";
        }
    }
})

export const { addToSearchKeywords, clearSearch } = filterSlice.actions;

export default filterSlice.reducer;