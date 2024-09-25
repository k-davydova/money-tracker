import { Outlet } from 'react-router-dom';
import styles from './MainPageWrapper.module.css';

const MainPageWrapper = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
};

export default MainPageWrapper;
