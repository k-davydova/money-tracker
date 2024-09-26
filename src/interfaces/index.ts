interface Expense {
  id: string;
  type: string;
  name: string;
  category: string;
  datetime: string;
  time: string;
  amount: number;
}

interface ExpensesState {
  expenses: Expense[];
}