"use client";
import { IText } from "@/app/core/application/interfaces/text.interface";
import { UtilApplicationInternal } from "@/app/core/application/utils/util.application";
import { useState } from "react";
import Input from "../atoms/Input";

interface IFormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  errors: string[];
  formCreate: IText;
  setFormCreate: (value: IText) => void;
}
export default function FormField({
  label,
  type,
  placeholder,
  name,
  errors,
  formCreate,
  setFormCreate,
}: IFormFieldProps): React.ReactNode {
  const [, setNewValue] = useState<string>("");
  const [showError, setShowError] = useState<string>("");
  const [disableInput] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setShowError(errors[0]);
      return;
    }
    const verify: boolean = UtilApplicationInternal.verifySpace(value);
    if (verify) {
      setShowError(errors[1]);
      return;
    }
    setShowError("");
    setNewValue(value);
    setFormCreate({
      ...formCreate,
      [name]: value,
    });

    console.log("formCreate", formCreate);
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <div className="relative">
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          style={{
            width: "100%",
            color: disableInput ? "var(--color-text-gray)" : "",
          }}
          disabled={disableInput}
        />
      </div>
      {showError && <span className="text-red-400">{showError}</span>}
    </div>
  );
}
