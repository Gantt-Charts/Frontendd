import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	charts: [],
};

export const chartsSlice = createSlice({
	name: "charts",
	initialState,
	reducers: {
		initCharts: (state, action) => {
			state.charts = action.payload;
		},
		addCharts: (state, action) => {
			state.charts = [...state.charts, action.payload];
		},
		editCharts: (state, action) => {
			state.charts = state.charts.map((chart) => (chart.id === action.payload.id ? action.payload : chart));
		},
		removeCharts: (state, action) => {
			state.charts = state.charts.filter((item) => item.id !== action.payload);
		},
	},
});

export const { actions: chartsActions, reducer: chartsReducer } = chartsSlice;
