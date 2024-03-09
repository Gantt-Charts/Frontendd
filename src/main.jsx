import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./app/providers/AuthProvider";
import { AppRoutes } from "./app/providers/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	</React.StrictMode>
);
