import { Route, Routes } from "react-router-dom";
import { MainPage } from "./mainPage";
import { ChartPage } from "./chartPage";
import { ChartsPage } from "./chartsPage";

export const AppRouter = () => {
	return (
		<Routes>
			<Route element={<MainPage />} path="/" />
			<Route element={<ChartsPage />} path="/charts" />
			<Route element={<ChartPage />} path="/charts/:id" />
		</Routes>
	);
};
