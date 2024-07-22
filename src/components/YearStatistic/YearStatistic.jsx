import { DatePicker } from '@mui/x-date-pickers';
import GraphicsWrapper from '../GraphicsWrapper/GraphicsWrapper';
import dayjs from 'dayjs';
import { useState } from 'react';
import ChartComponent from '../ChartComponent/ChartComponent';

const YearStatistic = () => {
  const [yearDate, setYearDate] = useState(dayjs(new Date()));

  const handleChangeYearDate = (date) => {
    setYearDate(dayjs(date));
  };

  return (
    <GraphicsWrapper
      title='Year statistic'
      datePickerComponent={
        <DatePicker
          defaultValue={yearDate}
          views={['year']}
          slotProps={{ textField: { size: 'small' } }}
          maxDate={dayjs('2041-12-31')}
          minDate={dayjs('2018-01-01')}
          onChange={handleChangeYearDate}
        />
      }
      chartComponent={
        <ChartComponent date={yearDate} dateType='year' chartType='bar' />
      }
    />
  );
};

export default YearStatistic;
