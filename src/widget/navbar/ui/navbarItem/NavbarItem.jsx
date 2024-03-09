import { AuthDataContext } from "@/app/providers/AuthProvider";
import { AppLink } from "@/shared/ui/appLink/AppLink";
import { useContext } from "react";
import cls from "classnames";
import styles from "./NavbarItem.module.sass";

export const NavbarItem = ({ item, isSelected, onClick }) => {
	const { authData } = useContext(AuthDataContext);

	if (item.authOnly && !authData) {
		return null;
	}

	return (
		<AppLink href={item.href} onClick={onClick} className={cls(styles.navbarItem, { [styles.isSelected]: isSelected })}>
			{item.value}
		</AppLink>
	);
};
