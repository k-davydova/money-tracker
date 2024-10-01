interface Transaction {
  id: string;
  type: 'expense' | 'income';
  name: string;
  category: string;
  datetime: string;
  time?: string;
  amount: number;
}

interface TransactionsState {
  expenses: Transaction[];
  incomes: Transaction[];
}
