"use client";

import { IText } from "@/app/core/application/interfaces/text.interface";
import TextArea from "../atoms/TextArea";

interface IFormFieldTextAreaProps {
  label: string;
  placeholder: string;
  name: string;
  error: string;
  formCreate: IText;
  setFormCreate: (value: IText) => void;
}
export default function FormFieldTextArea({
  label,
  placeholder,
  name,
  error,
  formCreate,
  setFormCreate,
}: IFormFieldTextAreaProps): React.ReactNode {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormCreate({
      ...formCreate,
      [name]: value,
    });
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <TextArea
        className="focus:outline-0 border-[var(--color-gray-light-three)] border-1 rounded-[6px] p-2"
        placeholder={placeholder}
        name={name}
        onChange={(e) => handleChange(e)}
      />
      {error && <span>{error}</span>}
    </div>
  );
}
