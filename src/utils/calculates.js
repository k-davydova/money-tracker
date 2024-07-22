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

export const calculateExpenses = (date, type, categories, expenses) => {
  return categories
    .map((category) => {
      const total = expenses
        .filter(
          (expense) =>
            formatDate(expense.datetime, type) === formatDate(date, type)
        )
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);

      return total > 0 ? { label: category, value: total } : null;
    })
    .filter((item) => item !== null)
    .sort((a, b) => b.value - a.value);
};

export const calculateMonthlyExpenses = (date, expenses) => {
  const chosenYear = new Date(date).getFullYear();
  const monthExpenses = Array(12).fill(0);

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

export const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.amount, 0);
