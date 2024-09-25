import styles from './GraphicsWrapper.module.css';

const GraphicsWrapper = ({ title, datePickerComponent, chartComponent }) => {
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
