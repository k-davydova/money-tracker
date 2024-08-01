import { DatePicker } from '@mui/x-date-pickers';
import GraphicsWrapper from '../GraphicsWrapper/GraphicsWrapper';
import dayjs from 'dayjs';
import { useState } from 'react';
import ChartComponent from '../ChartComponent/ChartComponent';
import { MAX_DATE_PICKER, MIN_DATE_PICKER } from '../../constants/dateLimits';

const YearStatistic = () => {
  const [yearData, setYearData] = useState(() => dayjs(new Date()));

  const handleChangeYearDate = (date) => {
    setYearData(dayjs(date));
  };

  return (
    <GraphicsWrapper
      title='Year statistic'
      datePickerComponent={
        <DatePicker
          defaultValue={yearData}
          views={['year']}
          slotProps={{ textField: { size: 'small' } }}
          maxDate={dayjs(MAX_DATE_PICKER)}
          minDate={dayjs(MIN_DATE_PICKER)}
          onChange={handleChangeYearDate}
        />
      }
      chartComponent={
        <ChartComponent date={yearData} dateType='year' chartType='bar' />
      }
    />
  );
};

export default YearStatistic;
