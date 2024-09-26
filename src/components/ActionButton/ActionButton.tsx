import styles from './ActionButton.module.css';
import addImg from '../../assets/icons/add.svg';
import { MouseEventHandler } from 'react';

interface Props {
  onOpen: MouseEventHandler<HTMLButtonElement>;
}

const ActionButton = ({ onOpen }: Props) => {
  return (
    <button className={styles.button} onClick={onOpen}>
      <img src={addImg} alt='add' />
      Add transaction
    </button>
  );
};

export default ActionButton;
