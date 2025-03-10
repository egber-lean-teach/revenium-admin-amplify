"use client";

import { UtilApplicationInternal } from "@/app/core/application/utils/util.application";
import { useEffect, useState } from "react";
import IconContent from "./IconContent";
import { IConCopy } from "../../../../public/icons";

export default function Copy({ value }: { value: string }): React.ReactNode {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyValue = async (value: string): Promise<void> => {
    const copy = await UtilApplicationInternal.copyText(value);
    if (copy) setCopied(true);
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("time");
      setCopied(false);
    }, 2000);
  }, [copied]);
  return (
    <span>
      <IconContent
        className="cursor-pointer absolute top-0 right-0"
        icon={<IConCopy />}
        onClick={() => handleCopyValue(value)}
      />
      {copied && (
        <span className="bg-[var(--color-green)] text-white p-1 rounded-[6px] absolute top-[20px] right-[-20px] text-[.6rem]">
          Copied text
        </span>
      )}
    </span>
  );
}
