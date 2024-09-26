import { forwardRef, LegacyRef, MouseEventHandler, RefAttributes } from 'react';
import styles from './CustomInput.module.css';
import { FaAngleDown } from 'react-icons/fa6';

interface Props {
  value: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const CustomInput = forwardRef(({ value, onClick }: Props, ref) => (
  <div className={styles['custom-input']} onClick={onClick} ref={ref}>
    <p>{value}</p>
    <span className={styles.arrow}>
      <FaAngleDown />
    </span>
  </div>
));

export default CustomInput;
