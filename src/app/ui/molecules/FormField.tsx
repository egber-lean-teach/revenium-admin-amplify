"use client";
import { IText } from "@/app/core/application/interfaces/text.interface";
import { UtilApplicationInternal } from "@/app/core/application/utils/util.application";
import { useState } from "react";
import Input from "../atoms/Input";
import IconContent from "../atoms/IconContent";
import { IConBlock, IconCheck } from "../../../../public/icons";

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
  const [newValue, setNewValue] = useState<string>("");
  const [showError, setShowError] = useState<string>("");
  const [disableInput, setDisableInput] = useState<boolean>(false);

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
        {!showError && (
          <IconContent
            className="absolute top-[15px] right-[20px] cursor-pointer text-[var(--color-green)]"
            icon={disableInput ? <IConBlock /> : <IconCheck />}
            onClick={() => {
              setFormCreate({
                ...formCreate,
                [name]: newValue,
              });
              setDisableInput(!disableInput);
            }}
          />
        )}
      </div>
      {showError && <span className="text-red-400">{showError}</span>}
    </div>
  );
}
