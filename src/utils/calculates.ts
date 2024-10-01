import { Dayjs } from 'dayjs';
import { EXPENSE_CATEGORIES } from '../constants/categories';
import { formatDate } from './formatters';

const MONTH_NAMES = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'june',
  'july',
  'aug',
  'sept',
  'oct',
  'nov',
  'dec',
];

interface CategoryExpense {
  ladel: string;
  value: number;
}

export const calculateExpenses = (
  date: Dayjs,
  type: 'day' | 'month',
  expenses
): CategoryExpense[] => {
  const totalExpenses = EXPENSE_CATEGORIES.reduce((acc, category) => {
    const expensesByCategory = expenses
      .filter(
        (expense: Transaction) =>
          formatDate(expense.datetime, type) === formatDate(date, type) &&
          expense.category === category
      )
      .reduce((sum, expense) => sum + expense.amount, 0);

    if (expensesByCategory > 0) {
      acc.push({ label: category, value: expensesByCategory });
    }

    return acc;
  }, []);

  return totalExpenses.sort((a, b) => b.value - a.value);
};

export const calculateMonthlyExpenses = (
  date: Dayjs,
  expenses: Transaction[]
): { label: string; value: number; stack: string }[] => {
  console.log(typeof date);
  const chosenYear = date.toDate().getFullYear();
  const monthExpenses: number[] = Array(12).fill(0);

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.datetime);
    const year = expenseDate.getFullYear();

    if (year === chosenYear) {
      const month = expenseDate.getMonth();
      monthExpenses[month] += expense.amount;
    }
  });

  return monthExpenses.map((monthExpense, index) => ({
    label: MONTH_NAMES[index],
    value: monthExpense,
    stack: MONTH_NAMES[index],
  }));
};

export const calculateTotal = (items: Transaction[]) =>
  items.reduce((total, item) => total + item.amount, 0);
