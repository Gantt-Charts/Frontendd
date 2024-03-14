import { useNavigate } from "react-router-dom";
import { PAGE_LOCALSTORAGE_SELECT } from "@/shared/const/localstorage";
import { Button } from "@/shared/ui/button/Button";
import { getRouteMain } from "@/shared/const/routes";
import { useDispatch } from "react-redux";
import { userActions } from "@/entities/user/model/slice/userSlice";

export const LogoutBtn = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(userActions.logout());
		navigate(getRouteMain());

		//Переделать доступ к страницам
		localStorage.setItem(PAGE_LOCALSTORAGE_SELECT, "Главная");
	};

	return <Button onClick={onLogout}>Выйти</Button>;
};
