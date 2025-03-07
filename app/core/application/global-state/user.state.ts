import { create } from "zustand";

interface IUserProfile {
  id: string;
  firstName: string;
  fullName: string;
  lastName: string;
  imageUrl: string;
  emailAddress: string;
}
interface IUserState {
  user: IUserProfile;
  setUser: (value: IUserProfile) => void;
}

export const useUserState = create<IUserState>((set) => ({
  user: {
    id: "",
    firstName: "",
    fullName: "",
    lastName: "",
    imageUrl: "",
    emailAddress: "",
  },
  setUser: (value: IUserProfile) => set(() => ({ user: value })),
}));
