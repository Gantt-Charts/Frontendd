import { AppLink } from "@/shared/ui/appLink/AppLink";
import styles from "./Navbar.module.sass";
import cls from "classnames";
import { Button } from "@/shared/ui/button/Button";
import { useState } from "react";
import { LoginModal } from "@/features/loginModal";

const links = [
	{
		value: "Главная",
		href: "/",
	},
	{
		value: "Диаграммы",
		href: "/charts",
	},
];

export const Navbar = ({ className }) => {
	const [isAuthModal, setIsAuthModal] = useState(false);

	const onClose = () => {
		setIsAuthModal(false);
	};

	const onShow = () => {
		setIsAuthModal(true);
	};

	return (
		<header className={cls(styles.navbar, className)}>
			<div className={styles.appLinks}>
				{links.map((link) => (
					<AppLink key={link.href} href={link.href}>
						{link.value}
					</AppLink>
				))}
			</div>
			<div className={styles.notifications}>
				<Button onClick={onShow}>Войти</Button>
				<Button>Выйти</Button>
			</div>

			{isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onClose} />}
		</header>
	);
};
