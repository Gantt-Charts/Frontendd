import { getRouteCharts, getRouteMain } from "@/shared/const/routes";

export const navbarItems = [
	{
		value: "Главная",
		href: getRouteMain(),
	},
	{
		value: "Диаграммы",
		href: getRouteCharts(),
		authOnly: true,
	},
];
