import React from "react";
import { Form } from "react-bootstrap";

type CustomFormGroupProps = {
  name: string;
  label: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomFormGroup = ({
  name,
  label,
  type = "text",
  value,
  placeholder,
  onChangeHandler,
}: CustomFormGroupProps) => {
  return (
    <Form.Group controlId={name} className="my-3">
      <Form.Label>
        <strong>{label}</strong>
      </Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
      />
    </Form.Group>
  );
};

export default CustomFormGroup;
