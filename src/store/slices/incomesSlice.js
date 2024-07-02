import { createSlice } from '@reduxjs/toolkit';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage';
import { INCOMES_INITIAL_STATE } from '../../constants/initials';

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
  },
});

export const { addIncome } = incomesSlice.actions;

export default incomesSlice.reducer;
