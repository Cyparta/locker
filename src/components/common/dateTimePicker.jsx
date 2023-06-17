import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment-hijri";
import { useDispatch } from "react-redux";
export default function FirstComponent() {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear, 11, 31);

  const [selectedDate, setSelectedDate] = React.useState(startOfYear);
  {
    console.log(selectedDate);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        defaultvalue={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          dispatch(setSelectedDate(e.target.value));
        }}
      />
    </LocalizationProvider>
  );
}
