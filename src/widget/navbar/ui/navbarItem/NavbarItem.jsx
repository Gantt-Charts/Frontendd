import { AuthDataContext } from "@/app/App";
import { AppLink } from "@/shared/ui/appLink/AppLink";
import { useContext } from "react";

export const NavbarItem = ({ item }) => {
	const { authData } = useContext(AuthDataContext);

	if (item.authOnly && !authData) {
		return null;
	}

	return (
		<AppLink key={item.href} href={item.href}>
			{item.value}
		</AppLink>
	);
};
