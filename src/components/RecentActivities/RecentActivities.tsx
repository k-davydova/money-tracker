import styles from './RecentActivities.module.css';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { saveToLocalStorage } from '../../utils/localStorage';
import RecentActivitiesItem from '../RecentActivitiesItem/RecentActivitiesItem';

interface Props {
  isWidget: boolean;
}

const RecentActivities = ({ isWidget }: Props) => {
  const expenses = useSelector(
    (state: { expenses: TransactionsState }) => state.expenses.expenses
  );
  const incomes = useSelector(
    (state: { incomes: TransactionsState }) => state.incomes.incomes
  );
  const [maxItemsToShow, setMaxItemsToShow] = useState(0);

  const activitiesRef = useRef<HTMLDivElement>(null);

  const allTransactions = useMemo(
    () => [...expenses, ...incomes],
    [expenses, incomes]
  );
  const sortedTransactions = useMemo(() => {
    return allTransactions
      .slice()
      .sort(
        (a, b) =>
          new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      );
  }, [allTransactions]);

  useEffect(() => {
    const transactionsToSave = {
      expenses,
      incomes,
    };

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
  }, [isWidget, sortedTransactions.length]);

  return (
    <div
      className={`${styles.activities} ${isWidget ? styles.widget : ''}`}
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
            .map(
              ({ id, type, name, category, datetime, amount }: Transaction) => (
                <RecentActivitiesItem
                  key={id}
                  id={id}
                  type={type}
                  name={name}
                  category={category}
                  datetime={datetime}
                  amount={amount}
                  isWidget={isWidget}
                />
              )
            )}
        {allTransactions.length === 0 && (
          <p className={styles.error}>You dont have any transactions :(</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
