"use client";
import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useDataHandler } from "./hooks";
import { DateTimePicker, InputFileUpload } from "@/components";

export default function Home() {
  const {
    data,
    filterData,
    error,
    loading,
    dateTimeRange,
    setDateTimeRange,
    handleFileUpload,
  } = useDataHandler();

  const columns: GridColDef[] = filterData.length
    ? Object.keys(filterData[0] as object).map((key) => {
        if (key === "id") {
          return { field: key, headerName: key, width: 180, hide: true }; // Ẩn cột ID
        }
        return {
          field: key,
          headerName: key,
          width: 180,
        };
      })
    : [];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Upload Query Data</h2>
        <InputFileUpload
          title="Upload"
          name="upload"
          onChange={handleFileUpload}
        />
        <h2>Time Input</h2>
        <DateTimePicker
          disabled={data.length == 0 || error !== null}
          value={dateTimeRange}
          setValue={setDateTimeRange}
        />
      </Box>
      {!loading && error && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Alert
            sx={{
              width: "fit-content",
            }}
            severity="error"
          >
            {error}
          </Alert>
        </Box>
      )}
      {!error && (
        <Box sx={{ height: "490px", width: "100%", margin: "1rem" }}>
          <DataGrid
            columnVisibilityModel={{
              id: false,
            }}
            loading={loading}
            rows={filterData}
            columns={columns}
            pagination
            pageSizeOptions={[50, 100, 200, 500]}
            getRowId={(row) => (row.STT || row.id) as GridRowId}
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
                    No Data
                  </Typography>
                </Box>
              ),
            }}
          />
        </Box>
      )}
    </Container>
  );
}
