import SidebarItem from '../SidebarItem/SidebarItem';
import styles from './Sidebar.module.css';

import { FaChartSimple, FaClockRotateLeft, FaChartPie } from 'react-icons/fa6';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <SidebarItem
            link='/dashboard'
            title='Dashboard'
            icon={FaChartSimple}
          />
          <SidebarItem link='/recent' title='Recent' icon={FaClockRotateLeft} />
          <SidebarItem link='/analytics' title='Analytics' icon={FaChartPie} />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
