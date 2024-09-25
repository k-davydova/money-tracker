import styles from './RecentActivitiesItem.module.css';

import { formatDate } from '../../utils/formatters';
import { FaArrowUp, FaArrowDown, FaTrash } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../../store/slices/expensesSlice';
import { deleteIncome } from '../../store/slices/incomesSlice';

const RecentActivitiesItem = ({
  id,
  title,
  type,
  category,
  date,
  amount,
  isWidget,
}) => {
  const dispatch = useDispatch();

  const formattedDate = formatDate(date);

  const handleDelete = () => {
    if (type === 'expense') {
      dispatch(deleteExpense(id));
    }

    if (type === 'income') {
      dispatch(deleteIncome(id));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles['content-box']}>
        <div className={styles['content']}>
          {type === 'income' && <FaArrowDown className={styles.income} />}
          {type === 'expense' && <FaArrowUp className={styles.expense} />}
          <div>
            <p className={styles.title}>{title}</p>
            <p className={styles.category}>{category}</p>
            <p className={styles.date}>{formattedDate}</p>
          </div>
        </div>
        <p className={styles.price}>$ {amount.toFixed(1)}</p>
      </div>
      {!isWidget && <FaTrash className={styles.trash} onClick={handleDelete} />}
    </div>
  );
};

export default RecentActivitiesItem;
