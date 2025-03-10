"use client";
import { useUserState } from "@/app/core/application/global-state/user.state";
import { ReactElement } from "react";
import ModalContent from "../molecules/ModalContent";

interface IIconContentProps {
  icon: ReactElement;
  className: string;
  onClick: () => void;
  modal?: boolean;
}
export default function IconContent({
  icon,
  className,
  onClick,
  modal = false,
}: IIconContentProps): React.ReactNode {
  const { user } = useUserState((state) => state);
  console.log("user --", user);
  return (
    <>
      {modal ? (
        <div className={`${className} relative`}>
          <span className="" onClick={onClick}>
            {icon}
          </span>
          <ModalContent>
            <ul>
              <li className="flex gap-4">
                <div className="w-[30px] h-[30px] rounded-[50%] bg-[var(--color-green)] flex justify-center items-center text-white font-bold">
                  <p>{(user && user.firstName[0]) || "User"}</p>
                </div>
                <div>
                  <h6>{user?.fullName}</h6>
                  <p className="text-[var(--color-text-gray)] text-[.8rem]">
                    {user?.emailAddress}
                  </p>
                </div>
              </li>
            </ul>
          </ModalContent>
        </div>
      ) : (
        <span className={className} onClick={onClick}>
          {icon}
        </span>
      )}
    </>
  );
}
