/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { create } from "zustand";

interface userType {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}
interface userStoreType {
  accessToken: string | null | undefined;
  user: userType | unknown;
  setAccessToken: (a: string | null | undefined) => void;
  removeAccessToken: () => void;
  setUser: (a: userType | null | undefined) => void;
  removeUser: () => void;
}

export const useStore = create<userStoreType>((set) => ({
  accessToken: null,
  user: {},
  setAccessToken: (token) =>
    set((state) => ({
      ...state,
      token,
    })),
  removeAccessToken: () =>
    set((state) => ({
      ...state,
    })),
  setUser: (user) =>
    set((state) => ({
      ...state,
      user,
    })),
  removeUser: () => set({ user: null }),
}));
