"use client";

import { ITextResponseComplete } from "@/app/core/application/dto/textResponse";
import {
  IModalMessage,
  initialModalMessage,
} from "@/app/core/application/interfaces/modalMessage.interface";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../atoms/Loading";
import { UtilApplicationInternal } from "@/app/core/application/utils/util.application";
import Button from "../atoms/Button";
import { IconEdit, IConTrash } from "../../../../public/icons";
import Modal from "./Modal";
import Copy from "../atoms/Copy";
import { useModalLoadingContentState } from "@/app/core/application/global-state/modalLoadingContent.state";
import organizationService from "@/app/infrastructure/services/text.service";

interface ITableProps {
  headers: string[];
  body: ITextResponseComplete;
}

export default function Table({ headers, body }: ITableProps): React.ReactNode {
  const { setModalLoadingContent } = useModalLoadingContentState(
    (state) => state
  );
  const [modalDelete, setModalDelete] =
    useState<IModalMessage>(initialModalMessage);
  const router = useRouter();
  const handleClickEdit = (): void => {
    console.log("edit");
  };

  const handleClickDelete = async (): Promise<void> => {
    const textId: string = modalDelete.message.split("/")[0];
    await organizationService.deleteText(textId);

    setModalDelete({
      message: "",
      code: 0,
      status: false,
    });
    setModalLoadingContent(true);
    router.push("/help_text");
  };

  return (
    <>
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
                    <Button variant="default" onClick={handleClickEdit}>
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
      {modalDelete.status && (
        <Modal
          open={modalDelete}
          setOpen={setModalDelete}
          size="sm"
          title="Please Confirm"
          subtitle={`Are you sure you want delete text: ${
            modalDelete.message.split("/")[0]
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
    </>
  );
}
