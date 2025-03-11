"use client";
import { useModalLoadingContentState } from "@/app/core/application/global-state/modalLoadingContent.state";
import { usePaginationState } from "@/app/core/application/global-state/pagination.state";
import { useSearchParams, useRouter } from "next/navigation";

export default function Pagination(): React.ReactNode {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { pagination, setPagination } = usePaginationState((state) => state);
  const { setModalLoadingContent } = useModalLoadingContentState(
    (state) => state
  );
  const currentPage: number = pagination.page;

  const handleClickPagination = (newPage: number) => {
    console.log("searchParams", searchParams);
    setPagination({ page: newPage, totalPage: pagination.totalPage });
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    setModalLoadingContent(true);
    router.push(`/dashboard/help_text?${params.toString()}`);
  };
  return (
    <div className="flex justify-end items-center gap-2">
      <p
        onClick={() => handleClickPagination(currentPage - 1)}
        className={`border-[var(--color-gray-light-three)] border-1 p-1 pl-3 pr-3 rounded-[6px] text-[var(--color-text-gray)] cursor-pointer hover:bg-gray-100 transition-colors .4s ease-in text-[.8rem] ${
          currentPage <= 0 ? "hidden" : ""
        }`}
      >
        Previus
      </p>
      <p className="bg-[var(--color-text-gray-hover)] text-white p-1 pl-3 pr-3 rounded-[6px] cursor-pointer">
        {pagination.page}
      </p>
      <p
        onClick={() => handleClickPagination(currentPage + 1)}
        className="border-[var(--color-gray-light-three)] border-1 p-1 pl-3 pr-3 rounded-[6px] text-[var(--color-text-gray)] cursor-pointer hover:bg-gray-100 transition-colors .4s ease-in text-[.8rem]"
      >
        Next
      </p>
    </div>
  );
}
