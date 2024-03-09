import { Page } from "@/widget/page";
import { SectionSteps } from "./sections/sectionSteps/SectionSteps";
import { SectionUtility } from "./sections/sectionUtility/SectionUtility";
import { SectionAdvantages } from "./sections/sectionAdvantages/SectionAdvantages";
import styles from "./MainPage.module.sass";

export const MainPage = () => {
	return (
		<Page className={styles.mainPage} isPadding={false}>
			<SectionSteps />
			<SectionAdvantages />
			<SectionUtility />
		</Page>
	);
};
