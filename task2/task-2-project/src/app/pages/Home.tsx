"use client";
import React from "react";
import {
  TextField,
  Container,
  FormGroup,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";

import Grid from "@mui/material/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ProminentAppBar from "@/app/components/AppBar";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/en-gb";
import { useForm } from "@/app/hooks";

export default function HomePage() {
  const {
    formData,
    errors,
    data,
    loading,
    handleChange,
    handleKeyDown,
    handleSelectChange,
    handleDateChange,
    handleSubmit,
  } = useForm();

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Ngày",
      width: 240,
      renderCell: (params) => {
        const time = (params as { row: { time: Dayjs | null } }).row.time;
        return time ? dayjs(time).format("DD/MM/YYYY") : "";
      },
    },
    {
      field: "time",
      headerName: "Giờ",
      width: 240,
      renderCell: (params) => {
        const time = (params as { row: { time: Dayjs | null } }).row.time;
        return time ? dayjs(time).format("HH:mm:ss") : "";
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
                    type="number"
                    label="Số lượng"
                    value={formData.quantity}
                    onChange={handleChange("quantity")}
                    onKeyDown={handleKeyDown}
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
                    type="number"
                    label="Doanh thu"
                    value={formData.revenue}
                    onChange={handleChange("revenue")}
                    onKeyDown={handleKeyDown}
                    fullWidth
                    error={!!errors.revenue}
                    helperText={errors.revenue}
                  />
                </FormControl>
              </Grid>

              <Grid size={12}>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    label="Đơn giá"
                    value={formData.price}
                    onChange={handleChange("price")}
                    onKeyDown={handleKeyDown}
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
