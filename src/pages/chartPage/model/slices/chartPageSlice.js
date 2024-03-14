import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	tasks: [],
};

export const chartPageSlice = createSlice({
	name: "chartPage",
	initialState,
	reducers: {
		initTasks: (state, action) => {
			state.tasks = action.payload;
		},
		addTasks: (state, action) => {
			state.tasks = [...state.tasks, action.payload];
		},
		editTasks: (state, action) => {
			state.tasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task));
		},
		removeTasks: (state, action) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},
	},
});

export const { actions: chartPageActions, reducer: chartPageReducer } = chartPageSlice;
