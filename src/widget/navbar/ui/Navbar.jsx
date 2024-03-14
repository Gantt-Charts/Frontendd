import { useEffect, useState } from "react";
import { PAGE_LOCALSTORAGE_SELECT } from "@/shared/const/localstorage";
import { LogoutBtn } from "@/features/logoutBtn";
import { AuthBtn } from "@/features/authBtn";
import { useSelector } from "react-redux";
import { getIsAuth } from "@/entities/user/model/selectors/getIsAuth";
import cls from "classnames";
import styles from "./Navbar.module.sass";
import { getNavbaritems } from "../model/selectors/getNavbarItems";
import { AppLink } from "@/shared/ui/appLink/AppLink";

export const Navbar = ({ className }) => {
	const [selectNavItem, setSelectNavItem] = useState("");
	const isAuth = useSelector(getIsAuth);
	const navbarItemsList = useSelector(getNavbaritems);

	const onSelectNavItem = (value) => () => {
		setSelectNavItem(value);
		localStorage.setItem(PAGE_LOCALSTORAGE_SELECT, value);
	};

	useEffect(() => {
		setSelectNavItem(localStorage.getItem(PAGE_LOCALSTORAGE_SELECT) || navbarItemsList[0].value);
	}, [navbarItemsList]);

	return (
		<header className={cls(styles.navbar, className)}>
			<div className={styles.appLinks}>
				{navbarItemsList.map((item) => {
					const additionalClass = { [styles.isSelected]: selectNavItem === item.value };

					return (
						<AppLink
							key={item.href}
							href={item.href}
							onClick={onSelectNavItem(item.value)}
							className={cls(styles.navbarItem, additionalClass)}
						>
							{item.value}
						</AppLink>
					);
				})}
			</div>
			<div className={styles.authBtn}>{!isAuth ? <AuthBtn /> : <LogoutBtn />}</div>
		</header>
	);
};
