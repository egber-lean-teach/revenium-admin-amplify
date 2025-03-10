"use client";

import { ITextResponseComplete } from "@/app/core/application/dto/textResponse";
import { useModalLoadingContentState } from "@/app/core/application/global-state/modalLoadingContent.state";
import {
  IModalMessage,
  initialModalMessage,
} from "@/app/core/application/interfaces/modalMessage.interface";
import {
  IText,
  textInitial,
} from "@/app/core/application/interfaces/text.interface";
import organizationService from "@/app/infrastructure/services/text.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Section from "../molecules/Section";
import Title from "../atoms/Title";
import IconContent from "../atoms/IconContent";
import {
  IconList,
  IconPlus,
  IconReload,
  IConSaveTwo,
} from "../../../../public/icons";
import ManageColumn from "../atoms/ManageColumn";
import Table from "../molecules/Table";
import Modal from "../molecules/Modal";
import FormFieldSelect from "../molecules/FormFieldSelect";
import FormField from "../molecules/FormField";
import FormFieldTextArea from "../molecules/FormFieldTextArea";
import Button from "../atoms/Button";
import { UtilApplicationInternal } from "@/app/core/application/utils/util.application";

interface IDashboardSectionOrganismsProps {
  response: ITextResponseComplete;
  categories: string[];
  subcategories: string[];
}
export default function DashboardSectionOrganisms({
  response,
  categories,
  subcategories,
}: IDashboardSectionOrganismsProps): React.ReactNode {
  const router = useRouter();
  const { setModalLoadingContent } = useModalLoadingContentState(
    (state) => state
  );
  const [modalCreate, setModalCreate] =
    useState<IModalMessage>(initialModalMessage);
  const [modalSave, setModalSave] =
    useState<IModalMessage>(initialModalMessage);
  const [showErrorCreate, setShowErroCreate] = useState<boolean>(false);
  const [formCreate, setFormCreate] = useState<IText>(textInitial);

  const tableHeaders: string[] = [
    "ID",
    "Category",
    "Subcategory",
    "Name",
    "Description",
    "Actions",
  ];

  const handleSubmitCreate = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formCreate.category ||
      !formCreate.description ||
      !formCreate.name ||
      !formCreate.subcategory
    ) {
      setShowErroCreate(true);
      return;
    }
    console.log("form data", formCreate);

    const data = await organizationService.createText(formCreate);
    console.log("data", data);
    setModalLoadingContent(true);
    setModalCreate({
      message: data.message,
      code: data.statusCode,
      status: false,
    });
    setModalSave({
      message: data.message,
      code: data.statusCode,
      status: true,
    });
    router.push("/dashboard/help_text");
  };

  return (
    <div>
      <Section>
        <Title />
        <div className="flex justify-end mb-3">
          <div className="flex flex-col gap-3">
            <div className="flex justify-end">
              <IconContent
                className="flex flex-center bg-[var(--color-text-gray-hover)] text-white p-2 rounded-[6px] cursor-pointer"
                icon={<IconPlus />}
                onClick={() =>
                  setModalCreate({
                    ...modalCreate,
                    status: true,
                  })
                }
              />
            </div>
            <ManageColumn
              icon={<IconList />}
              text="Manage Columns"
              onClick={() => console.log("manage columns  ")}
            />
          </div>
        </div>
        <Table headers={tableHeaders} body={response} />
        <div className="flex justify-between items-center mt-4">
          <span
            className="cursor-pointer border-[var(--color-gray-light-three)] border-1 rounded-[6px] p-2 hover:bg-[var(--color-gray-light-three)]"
            onClick={() => {
              setModalLoadingContent(true);
              router.push("/dashboard/help_text");
            }}
          >
            <IconReload />
          </span>
        </div>
        {modalCreate.status && (
          <Modal
            open={modalCreate}
            setOpen={setModalCreate}
            size="md"
            title="Create text"
            subtitle=""
            returnPage="/dashboard/help_text"
          >
            <form
              className="w-[100%] flex flex-col gap-3"
              onSubmit={handleSubmitCreate}
            >
              <FormFieldSelect
                label="Category"
                name="category"
                errors={["Is necesary a value", "Spaces are not allowed"]}
                id="category"
                options={categories}
                nameCreate="newCategory"
                placeholderCreate="Create new category"
                formCreate={formCreate}
                setFormCreate={setFormCreate}
              />

              <FormFieldSelect
                label="Subcategory"
                name="subcategory"
                errors={["Is necesary a value", "Spaces are not allowed"]}
                id="subcategory"
                options={subcategories}
                nameCreate="newSubcategory"
                placeholderCreate="Create new subcategory"
                formCreate={formCreate}
                setFormCreate={setFormCreate}
              />
              <FormField
                label="Name"
                name="name"
                placeholder=""
                errors={["Is necesary a value", "Spaces are not allowed"]}
                type="text"
                formCreate={formCreate}
                setFormCreate={setFormCreate}
              />
              <FormFieldTextArea
                error=""
                label="Description"
                name="description"
                placeholder="Enter description"
                formCreate={formCreate}
                setFormCreate={setFormCreate}
              />
              {showErrorCreate && (
                <span className="text-[.9rem] text-red-500">
                  Error. Is required all params
                </span>
              )}
              <span className="text-[.9rem] text-[var(--color-text-gray)] flex justify-end">
                Check the ✔️ for save the value
              </span>
              <div className="flex justify-end">
                <Button
                  variant="third"
                  onClick={() => {
                    console.log("form data", formCreate);
                    setFormCreate({
                      ...formCreate,
                      ["id"]: UtilApplicationInternal.generateKey(
                        formCreate.category,
                        formCreate.subcategory,
                        formCreate.name
                      ),
                    });
                  }}
                >
                  <IConSaveTwo />
                </Button>
              </div>
            </form>
          </Modal>
        )}
        {modalSave.status && (
          <Modal
            open={modalSave}
            setOpen={setModalSave}
            size="sm"
            title=""
            subtitle=""
            returnPage="help_text"
          >
            <p>{modalSave.message}</p>
          </Modal>
        )}
      </Section>
    </div>
  );
}
