"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import Logo from "./logo";
import AuthDialog from "./auth/auth-dialog";
import { useAuth } from "@/hooks/auth/use-auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogMode, setAuthDialogMode] = useState<"signin" | "signup">(
    "signin",
  );
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openAuthDialog = (mode: "signin" | "signup") => {
    setAuthDialogMode(mode);
    setAuthDialogOpen(true);
  };

  const closeAuthDialog = () => {
    setAuthDialogOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const menuVariants = {
    open: { opacity: 1, height: "auto", display: "flex" },
    closed: { opacity: 0, height: 0, transitionEnd: { display: "none" } },
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/motorcycles"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Motorcycles
              </Link>
              <Link
                href="/booking"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Booking
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium mr-2">
                      {user?.name.charAt(0)}
                    </div>
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center"
                  >
                    <LogOut size={18} className="mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => openAuthDialog("signin")}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
                  >
                    <User size={18} className="mr-1" />
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthDialog("signup")}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                  {user?.name.charAt(0)}
                </div>
              ) : (
                <button
                  onClick={() => openAuthDialog("signin")}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  aria-label="Sign in"
                >
                  <User size={20} />
                </button>
              )}
              <button
                className="text-gray-700 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.nav
            className="md:hidden flex flex-col space-y-4 py-4"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={menuVariants}
          >
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/motorcycles"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Motorcycles
            </Link>
            <Link
              href="/booking"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Booking
            </Link>

            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <span className="font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-red-600 hover:text-red-800 font-medium transition-colors inline-flex items-center"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openAuthDialog("signin");
                  }}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors inline-flex items-center"
                >
                  <User size={18} className="mr-1" />
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openAuthDialog("signup");
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors inline-block w-fit"
                >
                  Sign Up
                </button>
              </div>
            )}
          </motion.nav>
        </div>
      </header>

      {/* Auth Dialog */}
      <AuthDialog
        isOpen={authDialogOpen}
        onClose={closeAuthDialog}
        initialMode={authDialogMode}
      />
    </>
  );
}
