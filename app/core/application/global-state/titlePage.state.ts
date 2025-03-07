import { create } from "zustand";

interface ITitleState {
  title: string;
  setTitle: (value: string) => void;
}

export const useTitleState = create<ITitleState>((set) => ({
  title: "",
  setTitle: (value: string) => set(() => ({ title: value })),
}));
