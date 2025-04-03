"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut, Settings, Bell } from "lucide-react";
import Logo from "./logo";
import AuthDialog from "@/components/auth/auth-dialog";
import { useAuth } from "@/hooks/auth/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogMode, setAuthDialogMode] = useState<"signin" | "signup">(
    "signin",
  );
  const { user, isAuthenticated, logout } = useAuth();

  // Mock notification data - replace with your actual notification system
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Your booking has been confirmed",
      isRead: false,
      time: "5 min ago",
    },
    {
      id: 2,
      text: "New motorcycle added to your favorites",
      isRead: false,
      time: "1 hour ago",
    },
    {
      id: 3,
      text: "Reminder: Your rental starts tomorrow",
      isRead: true,
      time: "3 hours ago",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const menuVariants = {
    open: { opacity: 1, height: "auto", display: "flex" },
    closed: { opacity: 0, height: 0, transitionEnd: { display: "none" } },
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
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
                  {/* Notifications Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
                        <Bell className="h-5 w-5 text-gray-700" />
                        {unreadCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                            {unreadCount}
                          </Badge>
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <div className="flex items-center justify-between px-4 py-2 border-b">
                        <h3 className="font-medium">Notifications</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <DropdownMenuItem
                              key={notification.id}
                              className="p-0 focus:bg-transparent"
                            >
                              <div
                                className={`w-full p-3 hover:bg-gray-50 cursor-default ${!notification.isRead ? "bg-blue-50" : ""}`}
                                onClick={() => markAsRead(notification.id)}
                              >
                                <div className="flex items-start gap-2">
                                  {!notification.isRead && (
                                    <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                  )}
                                  <div
                                    className={`flex-1 ${!notification.isRead ? "font-medium" : ""}`}
                                  >
                                    <p className="text-sm">
                                      {notification.text}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {notification.time}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </DropdownMenuItem>
                          ))
                        ) : (
                          <div className="py-6 text-center text-gray-500">
                            No notifications
                          </div>
                        )}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          href="/notifications"
                          className="justify-center py-2 text-blue-600"
                        >
                          View all notifications
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* User Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center space-x-2 focus:outline-none">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                          {user?.name.charAt(0)}
                        </div>
                        <span className="text-gray-700 font-medium">
                          {user?.name}
                        </span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link
                          href="/profile"
                          className="flex items-center cursor-pointer"
                        >
                          <User size={16} className="mr-2" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/settings"
                          className="flex items-center cursor-pointer"
                        >
                          <Settings size={16} className="mr-2" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 focus:text-red-600 cursor-pointer"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
                      <Bell className="h-5 w-5 text-gray-700" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <h3 className="font-medium">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <DropdownMenuItem
                            key={notification.id}
                            className="p-0 focus:bg-transparent"
                          >
                            <div
                              className={`w-full p-3 hover:bg-gray-50 cursor-default ${!notification.isRead ? "bg-blue-50" : ""}`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex items-start gap-2">
                                {!notification.isRead && (
                                  <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                )}
                                <div
                                  className={`flex-1 ${!notification.isRead ? "font-medium" : ""}`}
                                >
                                  <p className="text-sm">{notification.text}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className="py-6 text-center text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/notifications"
                        className="justify-center py-2 text-blue-600"
                      >
                        View all notifications
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {user?.name.charAt(0)}
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center cursor-pointer"
                      >
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/settings"
                        className="flex items-center cursor-pointer"
                      >
                        <Settings size={16} className="mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors inline-flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={18} className="mr-1" />
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors inline-flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings size={18} className="mr-1" />
                  Settings
                </Link>
                <Link
                  href="/notifications"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors inline-flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Bell size={18} className="mr-1" />
                  Notifications
                  {unreadCount > 0 && (
                    <Badge className="ml-2 bg-orange-500 text-white text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Link>
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
