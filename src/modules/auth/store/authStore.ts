import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "../types/auth.model";

interface AuthStore extends AuthState {
  login: (token: string, userProfile: User) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user: User) => set({ user }),

      login: async (token: string, userProfile: User) => {
        set({
          token: token,
          user: userProfile,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
