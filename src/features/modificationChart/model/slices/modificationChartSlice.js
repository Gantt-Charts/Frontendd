import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: "",
	description: "",
};

export const modificationChartSlice = createSlice({
	name: "modificationChartSlice",
	initialState,
	reducers: {
		setChartName: (state, action) => {
			state.name = action.payload;
		},
		setChartDescription: (state, action) => {
			state.description = action.payload;
		},
	},
});

export const { actions: modificationChartActions, reducer: modificationChartReducer } = modificationChartSlice;
