import styles from './ActionButton.module.css';
import addImg from '../../assets/icons/add.svg';

const ActionButton = ({ onOpen }) => {
  return (
    <button className={styles.button} onClick={onOpen}>
      <img src={addImg} alt='add' />
      Add transaction
    </button>
  );
};

export default ActionButton;
