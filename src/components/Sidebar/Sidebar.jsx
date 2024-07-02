import SidebarItem from '../SidebarItem/SidebarItem';
import styles from './Sidebar.module.css';

import { FaChartSimple } from 'react-icons/fa6';

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
          <SidebarItem link='/recent' title='Recent' icon={FaChartSimple} />
          <SidebarItem
            link='/analytics'
            title='Analytics'
            icon={FaChartSimple}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

{
  /* <li>Dashboard</li>
<li>Recent</li>
<li>Analytics</li> */
}
