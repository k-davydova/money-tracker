import styles from './DashboardPage.module.css';

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

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expenses.expenses);

  const financeData = useMemo(() => {
    const totalIncome = calculateTotal(incomes);
    const totalExpense = calculateTotal(expenses);

    const currentMonthIncomes = filterByCurrentMonth(incomes);
    const currentMonthExpenses = filterByCurrentMonth(expenses);

    const totalMonthIncome = calculateTotal(currentMonthIncomes).toFixed(1);
    const totalMonthExpense = calculateTotal(currentMonthExpenses).toFixed(1);

    const totalBalance = (totalIncome - totalExpense).toFixed(1);

    return {
      totalMonthIncome,
      totalMonthExpense,
      totalBalance,
    };
  }, [incomes, expenses]);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles['left-column']}>
        <div className={styles['info-cards']}>
          <InfoCard
            title='Total Balance'
            amount={financeData.totalBalance}
            color='#ADC4FE'
            image={totalImg}
          />
          <InfoCard
            title='Monthly Incomes'
            amount={financeData.totalMonthIncome}
            color='#7BE9A0'
            image={incomeImg}
          />
          <InfoCard
            title='Monthly Expenses'
            amount={financeData.totalMonthExpense}
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

export default DashboardPage;
