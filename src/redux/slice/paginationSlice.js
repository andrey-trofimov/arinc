import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalStr: 0,
    startStr: 0,
    endStr: 0,
    strPerPage: 100,
};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setTotalStr: (state, action) => {
            state.totalStr = action.payload;
        },
        setStartStr: (state, action) => {
            state.startStr = action.payload;
        },
        setEndStr: (state, action) => {
            state.endStr = action.payload;
        }
    },
});

export const { setTotalStr, setStartStr, setEndStr } =
    paginationSlice.actions;

export default paginationSlice.reducer;
