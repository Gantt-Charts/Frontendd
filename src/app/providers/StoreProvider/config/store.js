import { chartsReducer } from "@/entities/charts/model/slices/chartsSlice";
import { userReducer } from "@/entities/user/model/slice/userSlice";
import { loginReducer } from "@/features/authModal/model/slice/loginSlice";
import { modificationChartReducer } from "@/features/modificationChart/model/slices/modificationChartSlice";
import { chartPageReducer } from "@/pages/chartPage/model/slices/chartPageSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({
	login: loginReducer,
	user: userReducer,
	charts: chartsReducer,
	modificationChart: modificationChartReducer,
	tasks: chartPageReducer,
});

export const store = configureStore({
	reducer: reducers,
});
