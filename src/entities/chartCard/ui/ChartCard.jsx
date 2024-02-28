import styles from './ChartCard.module.sass'

export const ChartCard = ({ title, description }) => {
  return (
    <div className={styles.chartCard}>
			<h3 className={styles.title}>{title}</h3>
			<span className={styles.description}>{description}</span>
		</div>
  )
}
