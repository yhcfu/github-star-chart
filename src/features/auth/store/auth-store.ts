import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: "",
  user: null,
  setToken: (token: string) => set({ token }),
  setUser: (user: string) => set({ user }),
}));

export default useAuthStore;
