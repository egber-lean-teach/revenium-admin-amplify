"use client";
import { useEffect } from "react";
import Loading from "../atoms/Loading";
import { useModalLoadingContentState } from "@/app/core/application/global-state/modalLoadingContent.state";

export default function LoadingContent(): React.ReactNode {
  const { modalLoadingContent, setModalLoadingContent } =
    useModalLoadingContentState((state) => state);

  useEffect(() => {
    setTimeout(() => {
      setModalLoadingContent(false);
    }, 2000);
  }, [setModalLoadingContent, modalLoadingContent]);
  return (
    <>
      {modalLoadingContent && (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-[var(--color-white-opacity)] flex justify-center items-center z-101">
          <Loading />
        </div>
      )}
    </>
  );
}
