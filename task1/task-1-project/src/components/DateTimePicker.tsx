import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro/DateTimeRangePicker";
import { Dayjs } from "dayjs";
import "dayjs/locale/en-gb";

type DateTimePickerProps = {
  value: [Dayjs | null, Dayjs | null];
  setValue: (value: [Dayjs | null, Dayjs | null]) => void;
  disabled?: boolean; // Optional prop
};

export default function DateTimePicker({
  value,
  setValue,
  disabled = false,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newValue: [Dayjs | null, Dayjs | null]) => {
    const [start, end] = newValue;
    if (start && end && start.isAfter(end)) {
      setError("Start date cannot be after end date.");
      return;
    }

    setError(null);
    setValue(newValue);
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
      <DemoContainer components={["DateTimeRangePicker"]}>
        <DateTimeRangePicker
          value={value}
          onChange={handleChange}
          disabled={disabled}
          localeText={{ start: "Start", end: "End" }} // Dynamic if needed
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        />
      </DemoContainer>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </LocalizationProvider>
  );
}
