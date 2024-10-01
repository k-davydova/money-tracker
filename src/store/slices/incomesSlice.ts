import { createSlice } from '@reduxjs/toolkit';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage';
import { INCOMES_INITIAL_STATE } from '../initialData';

const initialState = {
  incomes:
    getFromLocalStorage('transactions')?.incomes || INCOMES_INITIAL_STATE,
};

const incomesSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    addIncome: (state, action) => {
      const timestamp = Date.now();

      state.incomes.push({
        ...action.payload,
        id: `income_${timestamp}`,
      });

      saveToLocalStorage('transactions', { incomes: state.incomes });
    },
    deleteIncome: (state, action) => {
      state.incomes = state.incomes.filter(
        (income: Transaction) => income.id !== action.payload
      );

      saveToLocalStorage('transactions', { incomes: state.incomes });
    },
  },
});

export const { addIncome, deleteIncome } = incomesSlice.actions;

export default incomesSlice.reducer;
