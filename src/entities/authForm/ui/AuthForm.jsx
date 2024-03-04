import styles from "./AuthForm.module.sass";
import { Input } from "@/shared/ui/input/Input";
import { Button } from "@/shared/ui/button/Button";

export const AuthForm = ({ buttonValue, userName, userPassword, onChangeUsername, onChangePassword, onAuthClick }) => {
	return (
		<div className={styles.loginForm}>
			<Input type="text" onChange={onChangeUsername} value={userName} placeholder={"Введите логин"} />
			<Input type="text" onChange={onChangePassword} value={userPassword} placeholder={"Введите пароль"} />
			<Button className={styles.loginBtn} onClick={onAuthClick}>
				{buttonValue}
			</Button>
		</div>
	);
};
