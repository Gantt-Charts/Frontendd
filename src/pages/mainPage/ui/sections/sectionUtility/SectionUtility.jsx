import { Slide } from "@/entities/home/ui/stepLearn/Slide";
import styles from "./SectionUtility.module.sass";
import { Button } from "@/shared/ui/button/Button";
import { SectionContainer } from "../sectionContainer/SectionContainer";
import { AuthBtn } from "@/features/authBtn";

const utilityItems = [
	{
		step: 45,
		stepText: "Использование диаграмм ганта позволяет на 45% сократить время на планирование",
	},
	{
		step: 50,
		stepText: "Улучшает работу в команде на 50%",
	},
	{
		step: 75,
		stepText: "Частота рисков из-за срыва работы уменьшается на 75%",
	},
	{
		step: 30,
		stepText: "Затраты на реализацию и управление проектом сокращаются на 30%",
	},
];

export const SectionUtility = () => {
	return (
		<SectionContainer title="Статистика использования диаграмм Ганта">
			<div className={styles.utilityWrapper}>
				<div className={styles.utilities}>
					{utilityItems.map((item, index) => (
						<Slide
							key={index}
							topText={item.step}
							specSymbol="%"
							topSize={200}
							text={item.stepText}
							variant="square"
							isAnimate
							speedAnimation={2000}
						/>
					))}
				</div>

				<AuthBtn text="Зарегистрироваться" isLoginForm={false} variant="filled" color="secondary" className={styles.registrBtn} />
			</div>
		</SectionContainer>
	);
};
