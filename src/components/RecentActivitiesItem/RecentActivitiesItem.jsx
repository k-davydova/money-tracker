import styles from './RecentActivitiesItem.module.css';

import { formatDate } from '../../utils/formatters';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';

const RecentActivitiesItem = ({ title, type, category, date, amount }) => {
  const formattedDate = formatDate(date);

  let iconComponent = <FaArrowDown className={styles.income} />;

  if (type === 'expense') {
    iconComponent = <FaArrowUp className={styles.expense} />;
  }

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {iconComponent}
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.category}>{category}</p>
          <p className={styles.date}>{formattedDate}</p>
        </div>
      </div>
      <p className={styles.price}>$ {amount.toFixed(1)}</p>
    </div>
  );
};

export default RecentActivitiesItem;
