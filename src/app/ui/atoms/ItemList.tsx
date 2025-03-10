"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useTitleState } from "@/app/core/application/global-state/titlePage.state";
import { IList } from "@/app/core/application/interfaces/list.interface";

interface IItemListProps {
  data: IList;
}
export default function ItemList({ data }: IItemListProps): React.ReactNode {
  const { setTitle } = useTitleState((state) => state);

  useEffect(() => {
    setTitle(data.text || "");
  }, [data.text, setTitle]);
  return (
    <li>
      <Link
        className="flex items-center gap-3 text-[var(--color-text-gray)] cursor-pointer hover:text-[var(--color-text-gray-hover)] font-medium"
        href={data.href || ""}
      >
        {data.icon && <span>{data.icon}</span>}
        {data.text && <p>{data.text}</p>}
      </Link>
    </li>
  );
}
