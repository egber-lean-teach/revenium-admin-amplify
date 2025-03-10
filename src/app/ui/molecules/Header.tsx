"use client";
import Image from "next/image";
import { useState } from "react";
import { getCookies, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  IModalMessage,
  initialModalMessage,
} from "@/app/core/application/interfaces/modalMessage.interface";
import IconText from "../atoms/IconText";
import IconContent from "../atoms/IconContent";
import {
  IconArrowChange,
  IconLogout,
  IconUser,
} from "../../../../public/icons";
import Modal from "./Modal";
import Button from "../atoms/Button";

export default function Header(): React.ReactNode {
  const [open, setOpen] = useState<IModalMessage>(initialModalMessage);
  const [showModalUser, setShowModalUser] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    const cookies = await getCookies();
    Object.entries(cookies!).map(([Key]) => {
      deleteCookie(Key);
    });
    router.refresh();
  };

  return (
    <header className="flex justify-between items-center w-full border-gray-200 border-b-1 bg-[var(--color-gray-light)]">
      <div className="w-[18%] border-gray-200 border-r-1 p-5 pl-6">
        <Image
          src="/revenium-h.png"
          width={100}
          height={100}
          alt="image-revenium-logo"
          className="w-[50%]"
        />
      </div>
      <div className="pr-5 flex gap-3 items-center">
        <IconText text="Cobia Testing" icon={<IconArrowChange />} />
        <IconContent
          className=" bg-[var(--color-gray-light-two)] hover:bg-[var(--color-gray-light-three)] p-2 rounded-[50%] cursor-pointer"
          icon={<IconUser />}
          onClick={() => setShowModalUser(!showModalUser)}
          modal={showModalUser}
        />
        <IconContent
          className="bg-[var(--color-gray-light-two)] hover:bg-[var(--color-gray-light-three)] p-2 rounded-[50%] cursor-pointer"
          icon={<IconLogout />}
          onClick={() =>
            setOpen({
              message: "",
              code: 0,
              status: !open.status,
            })
          }
        />
      </div>
      {open.status && (
        <Modal
          title="Please Confirm"
          size="sm"
          subtitle="Are you sure you want yo logout?"
          open={open}
          setOpen={setOpen}
          returnPage="help_text"
        >
          <div className="flex justify-end items-center gap-2">
            <Button
              variant="second"
              onClick={() =>
                setOpen({
                  message: "",
                  code: 0,
                  status: false,
                })
              }
            >
              No
            </Button>
            <Button variant="third" onClick={handleLogout}>
              Yes I&apos;m sure
            </Button>
          </div>
        </Modal>
      )}
    </header>
  );
}
