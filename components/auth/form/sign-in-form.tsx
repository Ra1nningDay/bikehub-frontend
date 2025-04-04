import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";
import type { LoginFormData } from "@/lib/schemas";

interface SignInFormProps {
    onToggleMode: () => void;
    onClose: () => void;
}

export default function SignInForm({ onToggleMode, onClose }: SignInFormProps) {
    const { user, login, isLoading, error, validationErrors, clearError } =
        useAuth();
    const [googleError, setGoogleError] = useState<string | null>(null);

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

    useEffect(() => {
        if (user && !showSuccessAnimation) {
            setShowSuccessAnimation(true);
            setTimeout(() => {
                onClose();
            }, 1000);

            setTimeout(() => {
                setShowSuccessAnimation(false);
            }, 2000);
        }
    }, [user, showSuccessAnimation, onClose]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        // Clear errors when user types
        if (error) clearError();
        if (googleError) setGoogleError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(formData);

        if (success) {
            // Reset form on success
            setFormData({
                email: "",
                password: "",
                rememberMe: false,
            });
        }
    };

    const handleGoogleSignIn = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };

    return (
        <div className="relative">
            {/* Overlay Animation เมื่อ login สำเร็จ */}
            {showSuccessAnimation && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex border-0 items-center h-full justify-center bg-white z-50"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full"
                    />
                </motion.div>
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Welcome back
            </h2>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start"
                >
                    <AlertCircle
                        className="mr-2 flex-shrink-0 mt-0.5"
                        size={16}
                    />
                    <span>{error}</span>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-2 border ${
                                validationErrors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="your@email.com"
                            disabled={isLoading}
                        />
                    </div>
                    {validationErrors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {validationErrors.email}
                        </p>
                    )}
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Forgot password?
                        </button>
                    </div>
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-2 border ${
                                validationErrors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="••••••••"
                            disabled={isLoading}
                        />
                    </div>
                    {validationErrors.password && (
                        <p className="mt-1 text-sm text-red-600">
                            {validationErrors.password}
                        </p>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={isLoading}
                    />
                    <label
                        htmlFor="rememberMe"
                        className="ml-2 block text-sm text-gray-700"
                    >
                        Remember me
                    </label>
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                        isLoading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>

                <div className="relative flex items-center justify-center mt-6">
                    <div className="border-t border-gray-300 absolute w-full"></div>
                    <div className="bg-white px-3 relative text-sm text-gray-500">
                        or continue with
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        disabled={isLoading}
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.69-2.36 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.07 7.64 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.64 1 4.01 3.93 2.18 7.07L5.84 9.91c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Sign in with Google
                    </button>
                </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                    onClick={onToggleMode}
                    className="font-medium text-blue-600 hover:text-blue-500"
                    type="button"
                >
                    Sign up
                </button>
            </p>
        </div>
    );
}
