import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  displayName?: string;
  provider?: "email" | "google";
  roles: string[];
};

interface AuthStateActions {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setAuthStateFromProvider: (token: string, user: User) => void;
}

interface AuthStateData {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = create<AuthStateData & AuthStateActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAdmin: false,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axios.post<{ access_token: string }>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email,
              password,
            },
          );

          const { access_token } = res.data;
          document.cookie = `auth-token=${access_token}; path=/; max-age=3600`;

          const resUser = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            },
          );

          const user = resUser.data;
          const isAdmin = user.roles?.includes("admin") || false;

          document.cookie = `auth-token=${access_token}; path=/; max-age=3600`;
          document.cookie = `is-admin=${isAdmin ? "true" : "false"}; path=/; max-age=3600`;
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isAdmin,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error:
              error instanceof Error
                ? "Invalid email or password, please try again."
                : "An error occurred",
            isLoading: false,
          });
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axios.post<{
            access_token: string;
          }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            name,
            email,
            password,
          });

          const { access_token } = res.data;

          const resUser = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            },
          );

          const user = resUser.data;
          const isAdmin = user.role?.includes("admin") || false;

          document.cookie = `auth-token=${access_token}; path=/; max-age=3600`;
          document.cookie = `is-admin=${isAdmin ? "true" : "false"}; path=/; max-age=3600`;
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isAdmin,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          });
        }
      },

      logout: () => {
        document.cookie =
          "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "is-admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setAuthStateFromProvider: (token: string, user: User) => {
        const isAdmin = user.roles?.includes("admin") || false;

        set({
          token,
          user,
          isAuthenticated: true,
          isAdmin,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    },
  ),
);
