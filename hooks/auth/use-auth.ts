"use client";

import { useAuthStore } from "@/lib/auth-store";
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from "@/lib/schemas";
import type { User } from "@/lib/auth-store"; // หรือ "@/lib/auth-store"
import { useState } from "react";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isLoading,
    error: storeError,
    login: storeLogin,
    register: storeRegister,
    logout,
    clearError,
    setAuthStateFromProvider,
  } = useAuthStore();

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const login = async (data: LoginFormData) => {
    try {
      setValidationErrors({});
      // Validate form data
      loginSchema.parse(data);
      // Call store login
      await storeLogin(data.email, data.password);
      if (useAuthStore.getState().isAuthenticated) {
        if (useAuthStore.getState().isAdmin) {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            errors[err.path[0]] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
    return true;
  };

  const register = async (data: RegisterFormData) => {
    try {
      setValidationErrors({});
      // Validate form data
      registerSchema.parse(data);
      // Call store register
      storeRegister(data.name, data.email, data.password);
      if (useAuthStore.getState().isAuthenticated) {
        if (useAuthStore.getState().isAdmin) {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            errors[err.path[0]] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
    return true;
  };

  const handleProviderCallback = (
    receivedToken: string,
    receivedUser: User,
  ) => {
    try {
      if (!receivedToken || !receivedUser) {
        throw new Error("Missing token or user data from provider callback.");
      }

      setAuthStateFromProvider(receivedToken, receivedUser);
      return true;
    } catch (error) {
      console.error("Error handling provider callback:", error);
      useAuthStore.setState({
        error: "Failed to process provider login",
      });
      return false; // ล้มเหลว
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isLoading,
    error: storeError,
    validationErrors,
    login,
    register,
    logout,
    clearError,

    handleProviderCallback,
  };
}
