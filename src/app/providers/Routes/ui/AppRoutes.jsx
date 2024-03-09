import { RouterProvider } from "react-router-dom";
import { routeConfig } from "../config/routeConfig";

export const AppRoutes = () => {
	return <RouterProvider router={routeConfig} />;
};
