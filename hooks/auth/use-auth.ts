"use client";

import { useAuthStore } from "@/lib/auth-store";
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from "@/lib/schemas";
import { useState } from "react";
import { ZodError } from "zod";

export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error: storeError,
    login: storeLogin,
    register: storeRegister,
    logout,
    clearError,
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
      await storeRegister(data.name, data.email, data.password);
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

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error: storeError,
    validationErrors,
    login,
    register,
    logout,
    clearError,
  };
}
