import { configureStore } from '@reduxjs/toolkit';

import expensesReducer from './slices/expensesSlice';
import incomesReducer from './slices/incomesSlice';

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    incomes: incomesReducer,
  },
});

export default store;
