import { AppLink } from "@/shared/ui/appLink/AppLink";
import styles from "./Navbar.module.sass";
import cls from "classnames";
import { Button } from "@/shared/ui/button/Button";
import { useContext, useState } from "react";
import { LoginModal } from "@/features/loginModal";
import axios from "axios";
import { AuthDataContext } from "@/app/App";
import { USER_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_TOKEN } from "@/shared/const/localstorage";
import { NavbarItem } from "../navbarItem/NavbarItem";
import { useNavigate } from "react-router-dom";

const items = [
	{
		value: "Главная",
		href: "/",
	},
	{
		value: "Диаграммы",
		href: "/charts",
		authOnly: true,
	},
];

export const Navbar = ({ className }) => {
	const [isAuthModal, setIsAuthModal] = useState(false);
	const { authData, setAuthData } = useContext(AuthDataContext);
	const navigate = useNavigate();

	const onClose = () => {
		setIsAuthModal(false);
	};

	const onShow = () => {
		setIsAuthModal(true);
	};

	const onLogout = () => {
		setAuthData("");
		localStorage.removeItem(USER_LOCALSTORAGE_KEY);
		localStorage.removeItem(USER_LOCALSTORAGE_TOKEN);
		navigate("/");
	};

	const onLogin = (value) => {
		axios
			.post("http://26.146.72.207:8000/login/", {
				username: value.userName,
				password: value.userPassword,
			})
			.then((res) => {
				localStorage.setItem(USER_LOCALSTORAGE_KEY, res.data.username);
				localStorage.setItem(USER_LOCALSTORAGE_TOKEN, res.data.token);
				setAuthData(res.data.username);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const onRegister = (value) => {
		axios
			.post("http://26.146.72.207:8000/register/", {
				username: value.userName,
				password: value.userPassword,
			})
			.then((res) => {
				localStorage.setItem(USER_LOCALSTORAGE_KEY, res.data.username);
				localStorage.setItem(USER_LOCALSTORAGE_TOKEN, res.data.token);
				setAuthData(res.data.username);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<header className={cls(styles.navbar, className)}>
			<div className={styles.appLinks}>
				{items.map((item) => (
					<NavbarItem key={item.href} item={item} />
				))}
			</div>
			<div className={styles.notifications}>
				{!authData ? <Button onClick={onShow}>Войти</Button> : <Button onClick={onLogout}>Выйти</Button>}
			</div>

			{isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onClose} onLogin={onLogin} onRegister={onRegister} />}
		</header>
	);
};
