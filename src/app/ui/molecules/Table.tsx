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
import TextService from "@/app/infrastructure/services/text.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../atoms/Loading";
import { UtilApplicationInternal } from "@/app/core/application/utils/util.application";
import Copy from "../atoms/Copy";
import Button from "../atoms/Button";
import { IconEdit, IConSaveTwo, IConTrash } from "../../../../public/icons";
import Modal from "./Modal";
import FormFieldSelect from "./FormFieldSelect";
import FormField from "./FormField";
import FormFieldTextArea from "./FormFieldTextArea";

interface ITableProps {
  headers: string[];
  body: ITextResponseComplete;
}

export default function Table({ headers, body }: ITableProps): React.ReactNode {
  const { setModalLoadingContent } = useModalLoadingContentState(
    (state) => state
  );

  const [modalEdit, setModalEdit] =
    useState<IModalMessage>(initialModalMessage);
  const [editFormData, setEditFormData] = useState<IText>(textInitial);
  const [modalDelete, setModalDelete] =
    useState<IModalMessage>(initialModalMessage);
  const [showErrorEdit] = useState<boolean>(false);
  const [textById, setTextById] = useState<IText>(textInitial);
  const [modalSave, setModalSave] =
    useState<IModalMessage>(initialModalMessage);

  const router = useRouter();

  const handleClickEdit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const textId: string = modalEdit.message;
    if (!textId) return;
    if (
      !editFormData.category ||
      !editFormData.description ||
      !editFormData.name ||
      !editFormData.subcategory
    )
      return;
    const data = await TextService.updateText(editFormData, textId);
    console.log("data update", data);
    setModalLoadingContent(true);
    setModalSave({
      message: data.message,
      code: data.statusCode,
      status: true,
    });
    setModalEdit({
      ...modalEdit,
      status: false,
    });
    router.refresh();
  };

  const handleClickDelete = async (): Promise<void> => {
    const textId: string = modalDelete.message.split("/")[0];
    await TextService.deleteText(textId);

    setModalDelete({
      message: "",
      code: 0,
      status: false,
    });
    setModalLoadingContent(true);
    router.push("/dashboard/help_text");
  };

  return (
    <>
      <div className="overflow-y-scroll h-[67vh]">
        <table className="border border-gray-200 w-full table-auto rounded-lg">
          <thead>
            <tr className="border-b border-gray-200 hover:bg-[var(--color-gray-light)]">
              {headers.map((header: string, index: number) => (
                <th
                  className={`pt-2 pb-2 text-[var(--color-text-gray)] text-start font-medium text-[.9rem] ${
                    header === "ID" ? "flex justify-center" : ""
                  } `}
                  key={index}
                >
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {body.statusCode >= 400 ? (
              <tr>
                <td colSpan={6} className="p-10 content-message">
                  <div className="w-full flex justify-center items-center gap-6">
                    <Loading />
                    <p>{body.message}</p>
                  </div>
                </td>
              </tr>
            ) : (
              Object.entries(body?.data).map(([Key, value]) => (
                <tr
                  key={Key}
                  className="text-start border-b border-gray-200 text-[.9rem] hover:bg-[var(--color-gray-light)]"
                >
                  <td className="p-6">
                    <p className="bg-[var(--color-gray-light-two)] text-[.8rem] rounded-[6px] font-medium text-center relative">
                      {`${UtilApplicationInternal.firstFourLetter(
                        value.id.toLocaleLowerCase()
                      )}...`}
                      <Copy value={value.id} />
                    </p>
                  </td>
                  <td>{value.category}</td>
                  <td>{value.subcategory}</td>
                  <td>{value.name}</td>
                  <td>{value.description}</td>
                  <td>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        onClick={() => {
                          setModalEdit({
                            message: `${value.id}`,
                            code: 0,
                            status: true,
                          });
                          setTextById(value);
                        }}
                      >
                        <IconEdit />
                      </Button>
                      <Button
                        variant="fourth"
                        onClick={() => {
                          setModalDelete({
                            message: `${value.id}/${value.name}`,
                            code: 0,
                            status: !modalDelete.status,
                          });
                        }}
                      >
                        <IConTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {modalDelete.status && (
        <Modal
          open={modalDelete}
          setOpen={setModalDelete}
          size="sm"
          title="Please Confirm"
          subtitle={`Are you sure you want delete text: ${
            modalDelete.message.split("/")[1]
          }`}
          returnPage="help_text"
        >
          <div className="flex justify-end items-center gap-2">
            <Button
              variant="second"
              onClick={() =>
                setModalDelete({
                  message: "",
                  code: 0,
                  status: false,
                })
              }
            >
              No
            </Button>
            <Button variant="third" onClick={handleClickDelete}>
              Yes I&apos;m sure
            </Button>
          </div>
        </Modal>
      )}
      {modalEdit.status && (
        <Modal
          open={modalEdit}
          setOpen={setModalEdit}
          size="md"
          title="Update text"
          subtitle=""
          returnPage="help_text"
        >
          <form
            className="w-[100%] flex flex-col gap-3"
            onSubmit={handleClickEdit}
          >
            <FormFieldSelect
              label="Category"
              name="category"
              errors={["Is necesary a value", "Spaces are not allowed"]}
              id="category"
              options={[textById.category]}
              nameCreate="newCategory"
              placeholderCreate="Update category"
              formCreate={editFormData}
              setFormCreate={setEditFormData}
            />

            <FormFieldSelect
              label="Subcategory"
              name="subcategory"
              errors={["Is necesary a value", "Spaces are not allowed"]}
              id="subcategory"
              options={[textById.subcategory]}
              nameCreate="newSubcategory"
              placeholderCreate="Update subcategory"
              formCreate={editFormData}
              setFormCreate={setEditFormData}
            />
            <FormField
              label="Name"
              name="name"
              placeholder={`Update name: ${textById.name}`}
              errors={["Is necesary a value", "Spaces are not allowed"]}
              type="text"
              formCreate={editFormData}
              setFormCreate={setEditFormData}
            />
            <FormFieldTextArea
              error=""
              label="Description"
              name="description"
              placeholder={`Update description: ${textById.description
                .split(" ")
                .slice(0, 3)
                .join(" ")}...`}
              formCreate={editFormData}
              setFormCreate={setEditFormData}
            />
            {showErrorEdit && (
              <span className="text-[.9rem] text-red-500">
                Error. Is required all params
              </span>
            )}
            <div className="flex justify-end">
              <Button
                variant="third"
                onClick={() => {
                  setEditFormData({
                    ...editFormData,
                    ["id"]: UtilApplicationInternal.generateKey(
                      editFormData.category,
                      editFormData.subcategory,
                      editFormData.name
                    ),
                  });
                }}
              >
                <IConSaveTwo onClick={() => console.log("click")} />
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
          returnPage="/dashboard/help_text"
        >
          <p>{modalSave.message}</p>
        </Modal>
      )}
    </>
  );
}
