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
};

type AuthState = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
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
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export const useAuthStore = create<AuthStateData & AuthStateActions>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await axios.post<{ user: User; token: string }>(
                        "http://localhost:3000/auth/login",
                        {
                            email,
                            password,
                        }
                    );

                    const { user, token } = res.data;
                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : "An error occurred",
                        isLoading: false,
                    });
                }
            },

            register: async (name: string, email: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await axios.post<{
                        user: User;
                        token: string;
                        message?: string;
                    }>("http://localhost:3000/auth/register", {
                        name,
                        email,
                        password,
                    });
                    if (res.status !== 201) {
                        throw new Error(
                            res.data.message || "Registration failed"
                        );
                    }

                    const { user, token } = res.data;

                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : "An error occurred",
                        isLoading: false,
                    });
                }
            },

            logout: () => {
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
                set({
                    token,
                    user,
                    isAuthenticated: true,
                    isLoading: false, // ตั้งค่า isLoading เป็น false เมื่อสำเร็จ
                    error: null,
                });
                // console.log("Auth state set from provider:", { token, user });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
