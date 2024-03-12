import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_LOCALSTORAGE_SELECT, USER_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_TOKEN } from "@/shared/const/localstorage";
import { Button } from "@/shared/ui/button/Button";
import { getRouteMain } from "@/shared/const/routes";
import { AuthDataContext } from "@/app/providers/AuthProvider";

export const LogoutBtn = () => {
	const { setAuthData } = useContext(AuthDataContext);
	const navigate = useNavigate();

	const onLogout = () => {
		setAuthData("");
		localStorage.removeItem(USER_LOCALSTORAGE_KEY);
		localStorage.removeItem(USER_LOCALSTORAGE_TOKEN);
		navigate(getRouteMain());
		localStorage.setItem(PAGE_LOCALSTORAGE_SELECT, "Главная");
	};

	return <Button onClick={onLogout}>Выйти</Button>;
};
