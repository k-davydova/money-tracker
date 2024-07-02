import styles from './Modal.module.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  expenseCategories,
  incomeCategories,
} from '../../constants/categories';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../store/slices/expensesSlice';
import { addIncome } from '../../store/slices/incomesSlice';

const Modal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    type: 'expense',
    title: '',
    category: '',
    amount: null,
    datetime: new Date(),
  });

  const categories =
    formData.type === 'expense' ? expenseCategories : incomeCategories;

  const handleChangeDate = (datetime) => {
    setFormData((prevState) => ({
      ...prevState,
      datetime: datetime,
    }));
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      type,
      category: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const type = e.target.type.value;
    const title = e.target.title.value;
    const category = e.target.category.value;
    const datetime = formData.datetime;
    const amount = e.target.amount.value;

    setFormData((prevState) => ({
      ...prevState,
      type,
      title,
      category,
      datetime,
      amount,
    }));

    const newTransaction = {
      type: type,
      name: title,
      category: category,
      datetime: datetime.toISOString(),
      amount: +amount,
    };

    if (title.trim() && category && !isNaN(amount)) {
      if (type === 'expense') {
        dispatch(addExpense(newTransaction));
      }

      if (type === 'income') {
        dispatch(addIncome(newTransaction));
      }

      onClose();
    }
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div
        className={styles['modal-content']}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.title}>
          <h3>Title</h3>
          <button className={styles.close} onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.checkboxes}>
            <label>
              <input
                type='radio'
                name='type'
                value='expense'
                onChange={handleTypeChange}
                defaultChecked
              />
              <div className={`${styles.checkbox} ${styles.expense}`}>
                <span>Expense</span>
              </div>
            </label>
            <label>
              <input
                type='radio'
                name='type'
                value='income'
                onChange={handleTypeChange}
              />
              <div className={`${styles.checkbox} ${styles.income}`}>
                <span>Income</span>
              </div>
            </label>
          </div>
          <div>
            <input
              type='text'
              name='title'
              defaultValue={formData.title}
              placeholder='title'
            />
          </div>
          <div className={styles.selectWrapper}>
            <select
              className={styles.customSelect}
              defaultValue={formData.category}
              name='category'
            >
              <option value='' disabled hidden>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.box}>
            <input
              className={styles.amount}
              type='text'
              name='amount'
              defaultValue={formData.amount}
              placeholder='amount'
            />
            <DatePicker
              name='date'
              selected={formData.datetime}
              dateFormat='dd.MM.yyyy'
              onChange={handleChangeDate}
            />
          </div>
          <button className={styles.submit} type='submit'>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
