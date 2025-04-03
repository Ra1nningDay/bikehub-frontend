import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SignInForm from "./form/sign-in-form";
import SignUpForm from "./form/sign-up-form";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

export default function AuthDialog({
  isOpen,
  onClose,
  initialMode = "signin",
}: AuthDialogProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 overflow-hidden">
            {/* Header */}
            <div className="relative p-6 pb-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close dialog"
              >
                <X size={24} />
              </button>

              <div className="flex justify-center mb-6">
                <div className="flex items-center font-bold text-2xl">
                  <span className="text-blue-600">BIKE</span>
                  <span className="text-orange-500">HUB</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 font-medium text-center transition-colors ${
                    mode === "signin"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setMode("signin")}
                >
                  Sign In
                </button>
                <button
                  className={`flex-1 py-3 font-medium text-center transition-colors ${
                    mode === "signup"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setMode("signup")}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {mode === "signin" ? (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SignInForm onToggleMode={toggleMode} onClose={onClose} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SignUpForm onToggleMode={toggleMode} onClose={onClose} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
