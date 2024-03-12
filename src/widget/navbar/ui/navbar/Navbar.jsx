import { useContext, useEffect, useMemo, useState } from "react";
import { PAGE_LOCALSTORAGE_SELECT } from "@/shared/const/localstorage";
import { LogoutBtn } from "@/features/logoutBtn";
import { AuthBtn } from "@/features/authBtn";
import { NavbarItem } from "../navbarItem/NavbarItem";
import { navbarItems } from "../../const/navbarItems";
import cls from "classnames";
import styles from "./Navbar.module.sass";
import { AuthDataContext } from "@/app/providers/AuthProvider";

export const Navbar = ({ className }) => {
	const [selectNavItem, setSelectNavItem] = useState("");
	const { authData } = useContext(AuthDataContext);

	const onSelectNavItem = (value) => () => {
		setSelectNavItem(value);
		localStorage.setItem(PAGE_LOCALSTORAGE_SELECT, value);
	};

	useEffect(() => {
		setSelectNavItem(localStorage.getItem(PAGE_LOCALSTORAGE_SELECT) || navbarItems[0].value);
	}, [authData]);

	return (
		<header className={cls(styles.navbar, className)}>
			<div className={styles.appLinks}>
				{navbarItems.map((item) => (
					<NavbarItem
						key={item.href}
						item={item}
						isSelected={selectNavItem === item.value}
						onClick={onSelectNavItem(item.value)}
					/>
				))}
			</div>
			<div className={styles.authBtn}>{!authData ? <AuthBtn /> : <LogoutBtn />}</div>
		</header>
	);
};
