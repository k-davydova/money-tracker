import { DatePicker } from '@mui/x-date-pickers';
import GraphicsWrapper from '../GraphicsWrapper/GraphicsWrapper';
import dayjs from 'dayjs';
import { useState } from 'react';
import ChartComponent from '../ChartComponent/ChartComponent';

const MonthStatistic = () => {
  const [monthDate, setMonthDate] = useState(dayjs(new Date()));

  const handleChangeMonthDate = (date) => {
    setMonthDate(dayjs(date));
  };

  return (
    <GraphicsWrapper
      title='Month statistic'
      datePickerComponent={
        <DatePicker
          defaultValue={monthDate}
          views={['year', 'month']}
          openTo='month'
          slotProps={{ textField: { size: 'small' } }}
          maxDate={dayjs('2041-12-31')}
          minDate={dayjs('2018-01-01')}
          onChange={handleChangeMonthDate}
        />
      }
      chartComponent={
        <ChartComponent date={monthDate} dateType='month' chartType='bar' />
      }
    />
  );
};

export default MonthStatistic;
