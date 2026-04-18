import { create } from "zustand";

interface UserInfo {
  id: string;
  name: string | null;
  email: string | null;
  image?: string | null;
}

interface AuthState {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
