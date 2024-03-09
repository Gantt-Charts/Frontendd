import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createContext, useState } from "react";

export const AuthDataContext = createContext();

export const AuthProvider = ({ children }) => {
	const authStorageData = localStorage.getItem(USER_LOCALSTORAGE_KEY);
	const [authData, setAuthData] = useState(authStorageData || "");

	return <AuthDataContext.Provider value={{ authData, setAuthData }}>{children}</AuthDataContext.Provider>;
};
