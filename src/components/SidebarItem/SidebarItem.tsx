import { NavLink } from 'react-router-dom';
import styles from './SidebarItem.module.css';
import { ComponentType, ElementType } from 'react';

interface Props {
  title: string;
  icon: ElementType;
  link: string;
}

const SidebarItem = ({ title, icon, link }: Props) => {
  const IconComponent = icon;

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
