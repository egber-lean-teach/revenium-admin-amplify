import { create } from "zustand";

interface IModalLoadingContentState {
  modalLoadingContent: boolean;
  setModalLoadingContent: (value: boolean) => void;
}

export const useModalLoadingContentState = create<IModalLoadingContentState>(
  (set) => ({
    modalLoadingContent: false,
    setModalLoadingContent: (value: boolean) =>
      set(() => ({ modalLoadingContent: value })),
  })
);
