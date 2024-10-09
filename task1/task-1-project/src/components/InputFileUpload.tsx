import * as React from "react";
import Button from "@mui/material/Button";
import { forwardRef } from "react";

type InputFileUploadProps = {
  name?: string;
  title?: string;
  ref: React.RefObject<HTMLInputElement>;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFileUpload = forwardRef<HTMLInputElement, InputFileUploadProps>(
  ({ name, title, disabled, onChange }, ref) => {
    return (
      <Button
        sx={{
          backgroundColor: "#3f51b5",
          color: "#fff",
        }}
        disabled={disabled}
        component="label"
        tabIndex={-1}
      >
        {title}
        <input
          type="file"
          ref={ref}
          name={name}
          onChange={onChange}
          style={{
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: 1,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            whiteSpace: "nowrap",
            width: 1,
          }}
        />
      </Button>
    );
  }
);
InputFileUpload.displayName = "InputFileUpload";

export default InputFileUpload;
