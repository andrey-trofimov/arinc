import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  szrcaiDb: "",
  aeroflotDb: "",
  partDbMask: ".{4}ep.{126}",
  szrcaiPartDb: [],
  aeroflotPartDb: [],
  regExp:
    "....ep..............................................................................................................................",
  layout: "ep",
};

export const dbSlice = createSlice({
  name: "db",
  initialState,
  reducers: {
    setSzrcaiDb: (state, action) => {
      state.szrcaiDb = action.payload;
    },
    setAeroflotDb: (state, action) => {
      state.aeroflotDb = action.payload;
    },
    setPartDbMask: (state, action) => {
      state.partDbMask = action.payload;
    },
    setSzrcaiPartDb: (state, action) => {
      state.szrcaiPartDb = action.payload;
    },
    setAeroflotPartDb: (state, action) => {
      state.aeroflotPartDb = action.payload;
    },
    setRegExp: (state, action) => {
      state.regExp = action.payload;
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
  },
});

export const { setSzrcaiDb, setAeroflotDb, setPartDbMask, setSzrcaiPartDb, setAeroflotPartDb, setRegExp, setLayout } =
  dbSlice.actions;

export default dbSlice.reducer;
