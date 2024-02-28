import { Route, Routes } from "react-router-dom";
import { MainPage } from "./mainPage";
import { ChartPage } from "./chartPage";
import { ChartsPage } from "./chartsPage";

export const AppRouter = () => {
	return (
		<Routes>
			<Route element={<MainPage />} path="Frontend/" />
			<Route element={<ChartsPage />} path="Frontend/charts" />
			<Route element={<ChartPage />} path="Frontend/charts/:id" />
		</Routes>
	);
};
