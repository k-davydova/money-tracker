import { NavLink } from 'react-router-dom';
import styles from './SidebarItem.module.css';

const SidebarItem = ({ title, icon: IconComponent, link }) => {
  return (
    <li className={styles['sidebar-item']}>
      <NavLink
        to={link}
        className={({ isActive }) => (isActive ? `${styles.active}` : '')}
      >
        <div className={styles.content}>
          <IconComponent className={styles.icon} />
        </div>
        <h4>{title}</h4>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
