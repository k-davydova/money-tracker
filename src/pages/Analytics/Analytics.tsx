import styles from './Analytics.module.css';

import DayStatistic from '../../components/DayStatistic/DayStatistic';
import MonthStatistic from '../../components/MonthStatistic/MonthStatistic';
import YearStatistic from '../../components/YearStatistic/YearStatistic';

const Analytics = () => {
  return (
    <div className={styles.column}>
      <div className={styles.row}>
        <DayStatistic />
        <MonthStatistic />
      </div>
      <YearStatistic />
    </div>
  );
};

export default Analytics;
