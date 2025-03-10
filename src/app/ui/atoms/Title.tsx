"use client";
import { useTitleState } from "@/app/core/application/global-state/titlePage.state";
import Loading from "./Loading";

export default function Title(): React.ReactNode {
  const { title } = useTitleState((state) => state);
  console.log("title", title);
  return (
    <h1 className="font-medium text-[1.4rem]">{title ? title : <Loading />}</h1>
  );
}
