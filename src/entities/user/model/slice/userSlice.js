import { USER_LOCALSTORAGE_TOKEN } from "@/shared/const/localstorage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	_inited: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setInited: (state, action) => {
			state._inited = true;
			state.authData = action.payload;
		},

		setAuthData: (state, action) => {
			state.authData = action.payload;
			state._inited = true;
			localStorage.setItem(USER_LOCALSTORAGE_TOKEN, action.payload.token);
		},

		logout: (state) => {
			state.authData = undefined;
			state._inited = false;
			localStorage.removeItem(USER_LOCALSTORAGE_TOKEN);
		},
	},
});

export const { actions: userActions, reducer: userReducer } = userSlice;
