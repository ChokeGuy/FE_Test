import { useState } from "react";
import { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import { GridValidRowModel } from "@mui/x-data-grid";
import { SelectChangeEvent } from "@mui/material/Select";
type FormType = {
  time: Dayjs | null;
  quantity: number | "";
  pump: number | "";
  revenue: number | "";
  price: number | "";
};

const useForm = () => {
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
      const { value } = event.target;

      const sanitizedValue = value.replace(/[^0-9]/g, "");

      setFormData({ ...formData, [field]: sanitizedValue });
    };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Ngăn chặn nhập các ký tự không phải số
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
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

  return {
    formData,
    errors,
    data,
    loading,
    handleChange,
    handleKeyDown,
    handleSelectChange,
    handleDateChange,
    handleSubmit,
  };
};

export default useForm;
