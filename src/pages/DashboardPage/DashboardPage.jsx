import styles from './DashboardPage.module.css';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import InfoCard from '../../components/InfoCard/InfoCard';
import totalImg from '../../assets/icons/total.svg';
import incomeImg from '../../assets/icons/income.svg';
import expensesImg from '../../assets/icons/expenses.svg';
import GraphicsWrapper from '../../components/GraphicsWrapper/GraphicsWrapper';
import ActionButton from '../../components/ActionButton/ActionButton';
import RecentActivities from '../../components/RecentActivities/RecentActivities';
import Modal from '../../components/Modal/Modal';

const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.amount, 0);

const filterByCurrentMonth = (items) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return items.filter(({ datetime }) => {
    const itemDate = new Date(datetime);

    return (
      itemDate.getMonth() === currentMonth &&
      itemDate.getFullYear() === currentYear
    );
  });
};

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
        <GraphicsWrapper />
        <GraphicsWrapper />
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
