import { DatePicker } from '@mui/x-date-pickers';
import GraphicsWrapper from '../GraphicsWrapper/GraphicsWrapper';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import ChartComponent from '../ChartComponent/ChartComponent';
import { MAX_DATE_PICKER, MIN_DATE_PICKER } from '../../constants/dateLimits';

const DayStatistic = () => {
  const [dayData, setDayData] = useState<Dayjs>(() => dayjs(new Date()));

  const handleChangeDayDate = (date: Dayjs | null) => {
    if (date) setDayData(dayjs(date));
  };

  return (
    <GraphicsWrapper
      title='Day statistic'
      datePickerComponent={
        <DatePicker
          defaultValue={dayData}
          slotProps={{ textField: { size: 'small' } }}
          maxDate={dayjs(MAX_DATE_PICKER)}
          minDate={dayjs(MIN_DATE_PICKER)}
          onChange={handleChangeDayDate}
        />
      }
      chartComponent={<ChartComponent date={dayData} chartType='pie' />}
    />
  );
};

export default DayStatistic;
