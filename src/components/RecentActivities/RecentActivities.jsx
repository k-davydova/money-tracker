import { useSelector } from 'react-redux';
import RecentActivitiesItem from '../RecentActivitiesItem/RecentActivitiesItem';
import styles from './RecentActivities.module.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage';

const RecentActivities = ({ isWidget }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [maxItemsToShow, setMaxItemsToShow] = useState(0);

  const activitiesRef = useRef(null);

  const reduxExpenses = useSelector((state) => state.expenses.expenses);
  const reduxIncomes = useSelector((state) => state.incomes.incomes);

  const allTransactions = [...expenses, ...incomes];

  const sortedTransactions = allTransactions.sort(
    (a, b) => new Date(b.datetime) - new Date(a.datetime)
  );

  useEffect(() => {
    const savedTransactions = getFromLocalStorage('transactions');

    if (savedTransactions.length) {
      setExpenses(savedTransactions.expenses || []);
      setIncomes(savedTransactions.incomes || []);
    } else {
      setExpenses(reduxExpenses);
      setIncomes(reduxIncomes);
    }
  }, [reduxExpenses, reduxIncomes]);

  useEffect(() => {
    const transactionsToSave = { expenses, incomes };
    saveToLocalStorage('transactions', transactionsToSave);
  }, [expenses, incomes]);

  useEffect(() => {
    if (!isWidget) {
      setMaxItemsToShow(sortedTransactions.length);
      return;
    }

    const handleResize = () => {
      if (activitiesRef.current) {
        const activitiesHeight = activitiesRef.current.clientHeight - 30;
        const recentActivitiesItemHeight = 82;
        const itemsToShow = Math.floor(
          activitiesHeight / recentActivitiesItemHeight
        );

        setMaxItemsToShow(itemsToShow);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isWidget, allTransactions.length]);

  return (
    <div
      className={`${styles.activities} ${isWidget ? styles.widget : null}`}
      ref={activitiesRef}
    >
      <div className={styles.title}>
        <h2>Recent Activities</h2>
        {isWidget && <Link to='/recent'>See all</Link>}
      </div>
      <div className={styles.transactions}>
        {allTransactions.length > 0 &&
          sortedTransactions
            .slice(0, maxItemsToShow)
            .map(({ id, type, name, category, datetime, amount }) => (
              <RecentActivitiesItem
                key={id}
                type={type}
                title={name}
                category={category}
                date={datetime}
                amount={amount}
              />
            ))}
        {allTransactions.length === 0 && (
          <p className={styles.error}>You dont have any transactions :(</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
