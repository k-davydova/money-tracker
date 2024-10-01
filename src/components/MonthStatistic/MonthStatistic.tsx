import { DatePicker } from '@mui/x-date-pickers';
import GraphicsWrapper from '../GraphicsWrapper/GraphicsWrapper';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import ChartComponent from '../ChartComponent/ChartComponent';
import { MAX_DATE_PICKER, MIN_DATE_PICKER } from '../../constants/dateLimits';

const MonthStatistic = () => {
  const [monthData, setMonthData] = useState(() => dayjs(new Date()));

  const handleChangeMonthDate = (date: Dayjs | null) => {
    setMonthData(dayjs(date));
  };

  return (
    <GraphicsWrapper
      title='Month statistic'
      datePickerComponent={
        <DatePicker
          defaultValue={monthData}
          views={['year', 'month']}
          openTo='month'
          slotProps={{ textField: { size: 'small' } }}
          maxDate={dayjs(MAX_DATE_PICKER)}
          minDate={dayjs(MIN_DATE_PICKER)}
          onChange={handleChangeMonthDate}
        />
      }
      chartComponent={
        <ChartComponent date={monthData} dateType='month' chartType='bar' />
      }
    />
  );
};

export default MonthStatistic;
