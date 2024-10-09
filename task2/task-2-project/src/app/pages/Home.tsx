"use client";
import React, { useState } from "react";
import {
  TextField,
  Container,
  FormGroup,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridValidRowModel,
} from "@mui/x-data-grid";

import Grid from "@mui/material/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ProminentAppBar from "@/app/components/AppBar";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import "dayjs/locale/en-gb";

type FormType = {
  time: Dayjs | null;
  quantity: number | "";
  pump: number | "";
  revenue: number | "";
  price: number | "";
};
export default function HomePage() {
  const [formData, setFormData] = useState<FormType>({
    time: null,
    quantity: "",
    pump: "",
    revenue: "",
    price: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    time: "",
    quantity: "",
    pump: "",
    revenue: "",
    price: "",
  });

  const [data, setData] = useState<GridValidRowModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange =
    (field: keyof FormType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData({ ...formData, pump: event.target.value as number | "" });
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setFormData({ ...formData, time: newValue });
  };

  const validators: {
    [key: string]: (value: string | number | Dayjs | null) => string;
  } = {
    time: (value) => (value ? "" : "Thời gian không được để trống."),
    quantity: (value) =>
      value
        ? parseFloat(value as string) > 0
          ? ""
          : "Số lượng phải lớn hơn 0."
        : "Số lượng không được để trống.",
    pump: (value) =>
      value
        ? typeof value === "number" && value > 0
          ? ""
          : "Trụ phải lớn hơn 0."
        : "Trụ không được để trống.",
    revenue: (value) =>
      value
        ? parseFloat(value as string) > 0
          ? ""
          : "Doanh thu phải lớn hơn 0."
        : "Doanh thu không được để trống.",
    price: (value) =>
      value
        ? parseFloat(value as string) > 0
          ? ""
          : "Đơn giá phải lớn hơn 0."
        : "Đơn giá không được để trống.",
  };

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};

    Object.keys(formData).forEach((key) => {
      const field = key as keyof FormType;
      tempErrors[field] = validators[field](formData[field]);
    });

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      toast.success("Nhập giao dịch thành công");

      const newData = { ...formData, id: data.length + 1 };

      setData([...data, newData]);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  console.log(data);
  // Cấu hình cột
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Ngày",
      width: 240,
      renderCell: (params) => {
        const time = (params as { row: { time: Dayjs | null } }).row.time; // Lấy giá trị của trường time
        return time ? dayjs(time).format("DD/MM/YYYY") : ""; // Định dạng thành ngày
      },
    },
    {
      field: "time",
      headerName: "Giờ",
      width: 240,
      renderCell: (params) => {
        const time = (params as { row: { time: Dayjs | null } }).row.time; // Lấy giá trị của trường time
        return time ? dayjs(time).format("HH:mm:ss") : ""; // Định dạng thành giờ
      },
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 150,
    },
    {
      field: "pump",
      headerName: "Trụ",
      width: 150,
    },
    {
      field: "revenue",
      headerName: "Doanh thu",
      width: 150,
    },
    {
      field: "price",
      headerName: "Đơn giá",
      width: 150,
    },
    {
      field: "id",
      headerName: "STT",
      width: 100,
    },
  ];
  return (
    <>
      <Container maxWidth="xl" disableGutters>
        <ProminentAppBar onSubmit={handleSubmit} />
      </Container>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormControl fullWidth>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={"en-gb"}
                  >
                    <DateTimePicker
                      label="Thời gian"
                      value={formData.time}
                      onChange={handleDateChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.time,
                          helperText: errors.time,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid size={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Số lượng"
                    value={formData.quantity}
                    onChange={handleChange("quantity")}
                    fullWidth
                    error={!!errors.quantity}
                    helperText={errors.quantity}
                  />
                </FormControl>
              </Grid>

              <Grid size={12}>
                <FormControl fullWidth error={!!errors.pump}>
                  <InputLabel>Trụ</InputLabel>
                  <Select
                    label="Trụ"
                    value={formData.pump.toString()}
                    onChange={handleSelectChange}
                  >
                    {Array.from({ length: 9 }, (_, index) => index + 1).map(
                      (value) => (
                        <MenuItem key={value} value={value}>
                          0{value}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {!!errors.pump && (
                    <FormHelperText>{errors.pump}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Doanh thu"
                    value={formData.revenue}
                    onChange={handleChange("revenue")}
                    fullWidth
                    error={!!errors.revenue}
                    helperText={errors.revenue}
                  />
                </FormControl>
              </Grid>

              <Grid size={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Đơn giá"
                    value={formData.price}
                    onChange={handleChange("price")}
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </FormGroup>
        </form>
      </Container>
      <Container maxWidth="lg">
        <Box sx={{ height: "490px", width: "100%", margin: "1rem" }}>
          <DataGrid
            columnVisibilityModel={{
              id: false,
            }}
            loading={loading}
            rows={data}
            columns={columns}
            pagination
            pageSizeOptions={[50, 100, 200, 500]}
            getRowId={(row) => row.id as GridRowId}
            slots={{
              noRowsOverlay: () => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    backgroundColor: "#f0f0f0", // Light background color
                    padding: "16px", // Padding
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    Không có dữ liệu
                  </Typography>
                </Box>
              ),
            }}
          />
        </Box>
      </Container>
    </>
  );
}
