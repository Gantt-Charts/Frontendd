import { AppRouter } from "@/pages";
import { Navbar } from "@/widget/navbar";
import { createContext, useState } from "react";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import "./styles/index.sass";

export const AuthDataContext = createContext();

function App() {
	const authStorageData = localStorage.getItem(USER_LOCALSTORAGE_KEY);
	const [authData, setAuthData] = useState(authStorageData || "");

	return (
		<AuthDataContext.Provider value={{ authData, setAuthData }}>
			<div id="app" className="app app_light_theme">
				<Navbar />
				<AppRouter />
			</div>
		</AuthDataContext.Provider>
	);
}

export default App;
