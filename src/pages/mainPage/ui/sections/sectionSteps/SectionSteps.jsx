import { Fragment } from "react";
import { Slide } from "@/entities/home/ui/stepLearn/Slide";
import { AppIcon } from "@/shared/ui/appIcon/AppIcon";
import styles from "./SectionSteps.module.sass";
import ArrowSteps from "@/shared/assets/icons/arrowSteps.svg";
import { Button } from "@/shared/ui/button/Button";
import { SectionContainer } from "../sectionContainer/SectionContainer";
import { AuthBtn } from "@/features/authBtn";

const stepItems = [
	{
		step: 1,
		stepText: "Создайте профиль",
	},
	{
		step: 2,
		stepText: "Определитесь с целью",
	},
	{
		step: 3,
		stepText: "Создавайте и отмечайте сроки задач на диаграмме",
	},
];

export const SectionSteps = () => {
	return (
		<SectionContainer title="Пройдите 3 этапа для работы с диаграммами" isFirst>
			<div className={styles.stepsWrapper}>
				<div className={styles.steps}>
					{stepItems.map((item, index) => (
						<Fragment key={index}>
							<Slide topText={item.step} text={item.stepText} />
							{stepItems.length - 1 !== index && <AppIcon Svg={ArrowSteps} size="l" className={styles.icon} />}
						</Fragment>
					))}
				</div>
				<AuthBtn text="Зарегистрироваться" isLoginForm={false} variant="filled" color="secondary" className={styles.registrBtn} />
			</div>
		</SectionContainer>
	);
};
