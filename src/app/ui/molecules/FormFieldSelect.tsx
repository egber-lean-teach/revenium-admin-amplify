"use client";
import { useState } from "react";
import { UtilApplicationInternal } from "@/app/core/application/utils/util.application";
import { IText } from "@/app/core/application/interfaces/text.interface";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { IConClose, IconPlus } from "../../../../public/icons";

interface IFormFieldSelectProps<B> {
  label: string;
  name: string;
  id: string;
  errors: string[];
  placeholderCreate: string;
  nameCreate: string;
  formCreate: IText;
  setFormCreate: (value: IText) => void;
  options: B[];
}
export default function FormFieldSelect<B>({
  label,
  name,
  id,
  errors,
  options,
  placeholderCreate,
  formCreate,
  setFormCreate,
}: IFormFieldSelectProps<B>): React.ReactNode {
  const [showCreateInput, setShowCreateInput] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>("");
  const [showNewInput] = useState<boolean>(false);
  const [showError, setShowError] = useState<string>("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setFormCreate({
      ...formCreate,
      [name]: value,
    });
    setNewValue(value);
    // setShowNewInput(true);
    // setShowCreateInput(false);

    console.log("formCreate", formCreate);
  };

  const handleChangeValueSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormCreate({
      ...formCreate,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <div className="flex gap-2 w-[100%]">
        {showNewInput ? (
          <Input type="text" disabled placeholder={newValue} />
        ) : (
          <Select
            name={name}
            id={id}
            options={options}
            key={`${name}${id}${label}/1`}
            onChange={handleChangeValueSelect}
            style={{ width: "100%" }}
          />
        )}
        <Button
          variant="default"
          onClick={() => {
            setShowCreateInput(!showCreateInput);
          }}
        >
          {showCreateInput ? <IConClose /> : <IconPlus />}
        </Button>
      </div>
      {showCreateInput && (
        <div className="relative">
          <Input
            type="text"
            name={name}
            placeholder={placeholderCreate}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {/* {!showError && (
            <IconContent
              className="absolute top-[15px] right-[20px] cursor-pointer text-[var(--color-green)]"
              icon={<IconCheck />}
              onClick={() => {
                // setFormCreate({
                //   ...formCreate,
                //   [name]: newValue,
                // });
                // setShowNewInput(true);
                // setShowCreateInput(false);
              }}
            />
          )} */}
        </div>
      )}
      {showError && <span className="text-red-400">{showError}</span>}
    </div>
  );
}
