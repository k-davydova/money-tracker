import styles from './ChartComponent.module.css';
import {
  calculateExpenses,
  calculateMonthlyExpenses,
} from '../../utils/calculates';
import { useSelector } from 'react-redux';

import { PieChart, BarChart } from '@mui/x-charts';
import { CHART_COLORS, DARK_GREY_COLOR } from '../../constants/colors';
import { useMemo } from 'react';

const ChartComponent = ({ date, chartType, dateType = 'day' }) => {
  const expenses = useSelector((state) => state.expenses.expenses);

  const data =
    dateType === 'year'
      ? calculateMonthlyExpenses(date, expenses)
      : calculateExpenses(date, dateType, expenses);

  const dataValues = useMemo(() => data.map((data) => data.value), [data]);
  const dataLabels = useMemo(() => data.map((data) => data.label), [data]);

  const chart =
    chartType === 'bar' ? (
      <BarChart
        series={[{ data: dataValues }]}
        xAxis={[
          {
            scaleType: 'band',
            data: dataLabels,
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
              fill: DARK_GREY_COLOR,
            },
          },
        }}
      />
    );

  return (
    <div className={styles['chart-container']}>
      {data.length > 0 && chart}
      {data.length === 0 && (
        <p className={styles.error}>
          You dont have any transactions on this {dateType}
        </p>
      )}
    </div>
  );
};

export default ChartComponent;
