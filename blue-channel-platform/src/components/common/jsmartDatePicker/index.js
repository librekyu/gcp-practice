import React, { useCallback, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import moment from 'moment';
import { JsmartDatePickerStyle } from './jsmartDatePickerStyle';

registerLocale('ko', ko);

const jsmartDatePicker = (props) => {
  const [date, setDate] = useState(moment()
    .format('YYYY-MM-DD'));

  useEffect(() => {
    setDate(props.selectedDate);
  }, [props.selectedDate]);

  const handleChangeDate = useCallback((value) => {
    props.handleDatePickerChange(moment(value)
      .format('YYYY-MM-DD'));
  }, [props.handleDatePickerChange]);
  return (
    <>
      <JsmartDatePickerStyle>
        <DatePicker
          locale='ko'
          className='useDatepicker'
          dateFormat={props.dateFormat || 'yyyy-MM-dd'}
          selected={new Date(date)}
          onChange={handleChangeDate}
          showMonthYearPicker={props.isOnlyMonth || false}
          showMonthDropdown
          showYearDropdown
        />
      </JsmartDatePickerStyle>
    </>
  );
};

export default jsmartDatePicker;
