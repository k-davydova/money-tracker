import { Outlet } from 'react-router-dom';
// import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import styles from './MainPageWrapper.module.css';

const MainPageWrapper = () => {
  return (
    <div className={styles.wrapper}>
      {/* <DashboardPage /> */}
      <Outlet />
    </div>
  );
};

export default MainPageWrapper;
