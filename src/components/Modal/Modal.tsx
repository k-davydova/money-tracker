import styles from './Modal.module.css';
import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from '../../constants/categories';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../store/slices/expensesSlice';
import { addIncome } from '../../store/slices/incomesSlice';
import { MAX_DATE_PICKER, MIN_DATE_PICKER } from '../../constants/dateLimits';

interface Props {
  onClose: MouseEventHandler<HTMLDivElement>;
}

interface FormData {
  type: 'expense' | 'income';
  title: string;
  category: string;
  amount: number | null;
  datetime: Date;
}

const Modal = ({ onClose }: Props) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    type: 'expense',
    title: '',
    category: '',
    amount: null,
    datetime: new Date(),
  });

  const categories =
    formData.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleChangeDate = (datetime: Date) => {
    setFormData((prevState) => ({
      ...prevState,
      datetime: datetime,
    }));
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value as 'expense' | 'income';

    setFormData((prevState) => ({
      ...prevState,
      type,
      category: '',
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target;
    const type = target.type.value;
    const title = target.title.value;
    const category = target.category.value;
    const datetime = formData.datetime;
    const amount = target.amount.value;

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
      amount: Number(amount),
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
          <h3>Add new transaction</h3>
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
          <div>
            <select
              className={styles['custom-select']}
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
              slotProps={{
                textField: {
                  size: 'small',
                },
              }}
              defaultValue={dayjs(formData.datetime)}
              maxDate={dayjs(MAX_DATE_PICKER)}
              minDate={dayjs(MIN_DATE_PICKER)}
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
