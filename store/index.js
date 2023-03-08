import { create } from "zustand";

export const useStore = create((set) => ({
  accessToken: null,
  user: {},
  setAccessToken: (input) => set(() => ({ accessToken: input })),
  removeAccessToken: () => set({ accessToken: null }),
  setUser: (input) => set(() => ({ user: input })),
  removeUser: () => set({ user: null }),
}));
