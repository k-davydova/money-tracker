import { createSlice } from '@reduxjs/toolkit';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage';
import { EXPENSES_INITIAL_STATE } from '../../constants/initials';

const initialState = {
  expenses:
    getFromLocalStorage('transactions')?.expenses || EXPENSES_INITIAL_STATE,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const timestamp = Date.now();

      state.expenses.push({
        ...action.payload,
        id: `expense_${timestamp}`,
      });

      saveToLocalStorage('transactions', { expenses: state.expenses });
    },
  },
});

export const { addExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
