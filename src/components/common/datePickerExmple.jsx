import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { setDeliveryDate } from '../../store/shipping/shippingSlice';
import { format } from 'date-fns';
const DatePickerExample = ({value}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch()
  const minDate = new Date(2023, 0, 1);
  const maxDate = new Date(2024, 11, 31);

  const formatDate = (date) => {
    return date == undefined || null || " " ? "sss" : format(date, 'yyyy-MM-dd')
  };

  return (
    <DatePicker
      selected={value}
      onChange={(date) => dispatch(setDeliveryDate(formatDate(date)))}
      dateFormat="yy/MM/dd"
      minDate={minDate}
      maxDate={maxDate}
      placeholderText="DD/MM/YYY"
    />
  );
};

export default DatePickerExample;
