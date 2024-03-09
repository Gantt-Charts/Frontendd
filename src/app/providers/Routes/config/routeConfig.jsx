import { createBrowserRouter } from "react-router-dom";
import { ChartPage } from "@/pages/chartPage";
import { ChartsPage } from "@/pages/chartsPage";
import { MainPage } from "@/pages/mainPage";
import { getRouteChartDetails, getRouteCharts, getRouteMain } from "@/shared/const/routes";
import App from "@/app/App";

export const routeConfig = createBrowserRouter(
	[
		{
			element: <App />,
			children: [
				{
					element: <MainPage />,
					path: getRouteMain(),
				},
				{
					element: <ChartsPage />,
					path: getRouteCharts(),
				},
				{
					element: <ChartPage />,
					path: getRouteChartDetails(":id"),
				},
			],
			errorElement: <div>Страница не найдена</div>,
		},
	],
	{
		basename: "/Frontendd/",
	}
);
