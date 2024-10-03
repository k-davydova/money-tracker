import styles from './Dashboard.module.css';

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';

import { calculateTotal } from '../../utils/calculates';
import { filterByCurrentMonth } from '../../utils/filters';
import InfoCard from '../../components/InfoCard/InfoCard';
import totalImg from '../../assets/icons/total.svg';
import incomeImg from '../../assets/icons/income.svg';
import expensesImg from '../../assets/icons/expenses.svg';
import ActionButton from '../../components/ActionButton/ActionButton';
import RecentActivities from '../../components/RecentActivities/RecentActivities';
import Modal from '../../components/Modal/Modal';
import DayStatistic from '../../components/DayStatistic/DayStatistic';
import MonthStatistic from '../../components/MonthStatistic/MonthStatistic';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const incomes = useSelector(
    (state: { incomes: TransactionsState }) => state.incomes.incomes
  );
  const expenses = useSelector(
    (state: { expenses: TransactionsState }) => state.expenses.expenses
  );

  const totalBalance = useMemo(() => {
    const totalIncome = calculateTotal(incomes);
    const totalExpense = calculateTotal(expenses);
    return Number((totalIncome - totalExpense).toFixed(1));
  }, [incomes, expenses]);

  const totalMonthIncome = useMemo(() => {
    const currentMonthIncomes = filterByCurrentMonth(incomes);
    return Number(calculateTotal(currentMonthIncomes).toFixed(1));
  }, [incomes]);

  const totalMonthExpense = useMemo(() => {
    const currentMonthExpenses = filterByCurrentMonth(expenses);
    return Number(calculateTotal(currentMonthExpenses).toFixed(1));
  }, [expenses]);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles['left-column']}>
        <div className={styles['info-cards']}>
          <InfoCard
            title='Total Balance'
            amount={totalBalance}
            color='#ADC4FE'
            image={totalImg}
          />
          <InfoCard
            title='Monthly Incomes'
            amount={totalMonthIncome}
            color='#7BE9A0'
            image={incomeImg}
          />
          <InfoCard
            title='Monthly Expenses'
            amount={totalMonthExpense}
            color='#F0D77D'
            image={expensesImg}
          />
        </div>
        <div className={styles.charts}>
          <DayStatistic />
          <MonthStatistic />
        </div>
      </div>
      <div className={styles['right-column']}>
        <ActionButton onOpen={toggleModal} />
        <RecentActivities isWidget={true} />
      </div>
      {isModalOpen &&
        createPortal(<Modal onClose={toggleModal} />, document.body)}
    </div>
  );
};

export default Dashboard;
