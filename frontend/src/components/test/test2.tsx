import React, { useState } from "react";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from "@mui/material";

export default function Test() {
  const [selectedStartDate, setSelectedStartDate] = useState<dayjs.Dayjs | null>(
    dayjs()
  );
  const [selectedEndDate, setSelectedEndDate] = useState<dayjs.Dayjs | null>(
    dayjs().add(1, "month")
  );

  class MyCustomDateValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "MyCustomDateValidationError";
    }
  }
  
  // Define a custom error type that matches the expected type
  type MyCustomErrorType = {
    message: string;
  };
  
  const handleProjectDurationChange = (e: dayjs.Dayjs | null, type: string) => {
    if (type === "start") {
      if (e && (selectedEndDate === null || e.isBefore(selectedEndDate))) {
        setSelectedStartDate(e);
      } else {
        const errorMessage = "Invalid start date. Please select a date today or in the future.";
        const error: MyCustomErrorType = { message: errorMessage }; // Create a custom error object
        console.error(errorMessage);
        onError(error, selectedStartDate);
      }
    } else {
      if (e && (selectedStartDate === null || e.isAfter(selectedStartDate))) {
        setSelectedEndDate(e);
      } else {
        const errorMessage = "Invalid end date. Please select a date that is not earlier than the start date.";
        const error: MyCustomErrorType = { message: errorMessage }; // Create a custom error object
        console.error(errorMessage);
        onError(error, selectedEndDate);
      }
    }
  };
  
  const onError = (error: MyCustomErrorType, value: dayjs.Dayjs | null) => {
    // Here, you can access the error message from 'error.message' and perform any actions you want when an error occurs,
    // such as showing an error message to the user.
    const errorMessage = error.message || "An error occurred";
    console.error(errorMessage); // For demonstration purposes, we are logging the error message to the console.
  };

  const today = dayjs();
  const todayStartOfTheDay = today.startOf('day');
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
        ]}
      >
        <DemoItem>
          <DatePicker
            label="Enter Start Date"
            // value={selectedStartDate}
            // onChange={(newValue) => handleProjectDurationChange(newValue, "start")}
            // format="LL"
            // defaultValue={todayStartOfTheDay}
      
           
            slotProps={{
              textField: {
                helperText: 'MM/DD/YYYY',
              },
            }}
          />

          <DatePicker
            label="Enter End Date"
            value={selectedEndDate}
            onChange={(newValue) => handleProjectDurationChange(newValue, "end")}
            format="LL"
           
            slotProps={{
              textField: {
                helperText: 'MM/DD/YYYY',
              },
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
