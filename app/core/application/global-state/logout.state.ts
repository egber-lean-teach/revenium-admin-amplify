import { create } from "zustand";

interface ILogoutState {
  logout: boolean;
  setLogout: (value: boolean) => void;
}

export const useLogoutState = create<ILogoutState>((set) => ({
  logout: false,
  setLogout: (value: boolean) => set(() => ({ logout: value })),
}));
