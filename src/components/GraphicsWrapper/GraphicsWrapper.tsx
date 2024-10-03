import { ReactNode } from 'react';
import styles from './GraphicsWrapper.module.css';

interface Props {
  title: string;
  datePickerComponent: ReactNode;
  chartComponent: ReactNode;
}

const GraphicsWrapper = ({
  title,
  datePickerComponent,
  chartComponent,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <div className={styles.date}>{datePickerComponent}</div>
      </div>
      {chartComponent}
    </div>
  );
};

export default GraphicsWrapper;
