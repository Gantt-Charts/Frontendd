import { getAuthData } from "@/entities/user/model/selectors/getAuthData";
import { getRouteCharts, getRouteMain } from "@/shared/const/routes";
import { createSelector } from "@reduxjs/toolkit";

export const getNavbaritems = createSelector(getAuthData, (authData) => {
	const navbarItemsList = [
		{
			value: "Главная",
			href: getRouteMain(),
		},
	];

	if (authData) {
		navbarItemsList.push({
			value: "Диаграммы",
			href: getRouteCharts(authData.username),
			authOnly: true,
		});
	}

	return navbarItemsList;
});
