import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./app/providers/Routes";
import { StoreProvider } from "./app/providers/StoreProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StoreProvider>
			<AppRoutes />
		</StoreProvider>
	</React.StrictMode>
);
