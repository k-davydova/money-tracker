import { DatePicker } from '@mui/x-date-pickers';
import GraphicsWrapper from '../GraphicsWrapper/GraphicsWrapper';
import dayjs from 'dayjs';
import { useState } from 'react';
import ChartComponent from '../ChartComponent/ChartComponent';

const DayStatistic = () => {
  const [dayDate, setDayDate] = useState(dayjs(new Date()));

  const handleChangeDayDate = (date) => {
    setDayDate(dayjs(date));
  };

  return (
    <GraphicsWrapper
      title='Day statistic'
      datePickerComponent={
        <DatePicker
          defaultValue={dayDate}
          slotProps={{ textField: { size: 'small' } }}
          maxDate={dayjs('2041-12-31')}
          minDate={dayjs('2018-01-01')}
          onChange={handleChangeDayDate}
        />
      }
      chartComponent={<ChartComponent date={dayDate} chartType='pie' />}
    />
  );
};

export default DayStatistic;
