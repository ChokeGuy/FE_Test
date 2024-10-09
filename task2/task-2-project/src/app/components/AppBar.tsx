import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { IconButton, Typography } from "@mui/material";

type ProminentAppBarProps = {
  onSubmit: (event: { preventDefault: () => void }) => void;
};

export default function ProminentAppBar({ onSubmit }: ProminentAppBarProps) {
  return (
    <AppBar
      sx={{
        backgroundColor: "#ffffff",
        marginBottom: "48px",
        padding: "16px 32px",
      }}
      position="static"
    >
      <Box
        sx={{
          width: 580,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "56px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "0 16px",
              alignItems: "center",
              height: "56px",
              color: "#000",
            }}
          >
            <IconButton>
              <ArrowBackIcon
                sx={{
                  width: "20px",
                  height: "20px",
                  marginRight: "2px",
                }}
              />
            </IconButton>
            <span>Đóng</span>
          </Box>
          <Button
            sx={{
              borderRadius: "8px",
              padding: "8px 16px",
              textTransform: "none",
              backgroundColor: "#2970FF",
            }}
            variant="contained"
            onClick={onSubmit}
          >
            Cập nhật
          </Button>
        </Box>
        <Typography
          sx={{
            color: "#000",
            padding: "0 16px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Nhập giao dịch
        </Typography>
      </Box>
    </AppBar>
  );
}
