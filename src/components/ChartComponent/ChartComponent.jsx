import styles from './ChartComponent.module.css';
import {
  calculateExpenses,
  calculateMonthlyExpenses,
} from '../../utils/calculates';
import { useSelector } from 'react-redux';
import { expenseCategories } from '../../constants/categories';

import { PieChart, BarChart } from '@mui/x-charts';
import { CHART_COLORS } from '../../constants/colors';

const ChartComponent = ({ date, chartType, dateType = 'day' }) => {
  const reduxExpenses = useSelector((state) => state.expenses.expenses);

  const data =
    dateType === 'year'
      ? calculateMonthlyExpenses(date, reduxExpenses)
      : calculateExpenses(date, dateType, expenseCategories, reduxExpenses);

  const chart =
    chartType === 'bar' ? (
      <BarChart
        series={[{ data: data.map((data) => data.value) }]}
        xAxis={[
          {
            scaleType: 'band',
            data: data.map((data) => data.label),
            colorMap: {
              type: 'ordinal',
              colors: CHART_COLORS,
            },
          },
        ]}
      />
    ) : (
      <PieChart
        colors={CHART_COLORS}
        series={[
          {
            data: data,
            cy: '50%',
            cx: '25%',
          },
        ]}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 14,
              fill: '#464646',
            },
          },
        }}
      />
    );

  return (
    <div className={styles['chart-container']}>
      {data.length > 0 && chart}
      {!data.length && (
        <p className={styles.error}>
          You dont have any transactions on this {dateType}
        </p>
      )}
    </div>
  );
};

export default ChartComponent;
