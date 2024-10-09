import { useState, useEffect, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import * as XLSX from "xlsx";
import { GridValidRowModel } from "@mui/x-data-grid";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const useDataHandler = () => {
  const [data, setData] = useState<GridValidRowModel[]>([]);
  const [filterData, setFilterData] = useState<GridValidRowModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dateTimeRange, setDateTimeRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([dayjs("2024-03-21T00:00:00"), dayjs("2024-03-21T23:59:59")]);

  const resetStates = () => {
    setData([]);
    setDateTimeRange([
      dayjs("2024-03-21T00:00:00"),
      dayjs("2024-03-21T23:59:59"),
    ]);
  };

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const mimeType = file.type;
        if (
          mimeType !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          setError(
            "Invalid file format. Please upload a valid Excel (.xlsx) file."
          );
          resetStates();
          return;
        }

        setLoading(true);
        setError(null);
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json<unknown[]>(worksheet, {
              defval: "",
              header: 1,
              blankrows: false,
            });

            const startRowIndex = jsonData.findIndex((row) =>
              row.every(
                (cell) => cell !== undefined && cell !== null && cell !== ""
              )
            );
            let [headers, ...rows] = jsonData;
            if (startRowIndex !== -1) {
              [headers, ...rows] = jsonData.slice(startRowIndex);
            }

            const validHeaders = headers.filter(
              (header) => typeof header === "string" && header.trim() !== ""
            );

            if (validHeaders.length === 0) {
              throw new Error(
                "No valid data found. The file structure might be incorrect."
              );
            }

            const filteredData = rows.map((row, index) => {
              const filteredRow: { [key: string]: unknown } = {};
              validHeaders.forEach((header, colIndex) => {
                filteredRow[header as string] =
                  row[colIndex] !== undefined ? row[colIndex] : "";
              });
              filteredRow.id = index + 1;
              return filteredRow;
            });

            setData(filteredData as GridValidRowModel[]);
            setDateTimeRange([
              dayjs("2024-03-21T00:00:00"),
              dayjs("2024-03-21T23:59:59"),
            ]);
          } catch {
            resetStates();
            setError("Invalid file format. Please upload a valid Excel file.");
          } finally {
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    },
    []
  );

  useEffect(() => {
    const getFilteredData = (start: Dayjs, end: Dayjs) => {
      return data.filter((row) => {
        const dateString = `${row["Ngày"]} ${row["Giờ"]}`;
        const date = dayjs(dateString, "DD/MM/YYYY HH:mm:ss");
        return date.isSameOrAfter(start) && date.isSameOrBefore(end);
      });
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const [start, end] = dateTimeRange;

        const minDate = dayjs("21/03/2024", "DD/MM/YYYY");
        const maxDate = minDate.endOf("day"); // 21/03/2024 23:59:59

        if (start?.isAfter(maxDate)) {
          setFilterData([]);
          return;
        }

        if (start && end) {
          if (start.isAfter(maxDate) || end.isBefore(minDate)) {
            setFilterData([]);
          } else {
            const updatedFilteredData = getFilteredData(start, end);
            setFilterData(updatedFilteredData);
          }
        } else {
          setFilterData(data);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [dateTimeRange, data]);

  return {
    data,
    filterData,
    error,
    loading,
    dateTimeRange,
    setDateTimeRange,
    handleFileUpload,
    resetStates,
  };
};

export default useDataHandler;
