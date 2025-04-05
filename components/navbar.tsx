"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
      transitionEnd: { display: "none" },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const bellAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 },
    },
  };

  const badgeAnimation = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const dropdownItemAnimation = {
    initial: { x: -10, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      x: 10,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 bg-white shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex-shrink-0">
                <Logo />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="/motorcycles"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Motorcycles
                </Link>
              </motion.div>

              {isAuthenticated ? (
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {/* Notifications Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                        {...bellAnimation}
                        whileHover="animate"
                      >
                        <Bell className="h-5 w-5 text-gray-700" />
                        <AnimatePresence>
                          {unreadCount > 0 && (
                            <motion.div
                              {...badgeAnimation}
                              className="absolute -top-1 -right-1"
                            >
                              <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                                {unreadCount}
                              </Badge>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <div className="flex items-center justify-between px-4 py-2 border-b">
                        <h3 className="font-medium">Notifications</h3>
                        {unreadCount > 0 && (
                          <motion.button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-800"
                            whileHover={{
                              scale: 1.05,
                            }}
                            whileTap={{
                              scale: 0.95,
                            }}
                          >
                            Mark all as read
                          </motion.button>
                        )}
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification, index) => (
                            <DropdownMenuItem
                              key={notification.id}
                              className="p-0 focus:bg-transparent"
                            >
                              <motion.div
                                {...dropdownItemAnimation}
                                transition={{
                                  delay: index * 0.05,
                                }}
                                className={`w-full p-3 hover:bg-gray-50 cursor-default ${
                                  !notification.isRead ? "bg-blue-50" : ""
                                }`}
                                onClick={() => markAsRead(notification.id)}
                              >
                                <div className="flex items-start gap-2">
                                  {!notification.isRead && (
                                    <motion.div
                                      className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"
                                      initial={{
                                        scale: 0.5,
                                        opacity: 0.5,
                                      }}
                                      animate={{
                                        scale: 1,
                                        opacity: 1,
                                      }}
                                      transition={{
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                        duration: 1.5,
                                      }}
                                    />
                                  )}
                                  <div
                                    className={`flex-1 ${
                                      !notification.isRead ? "font-medium" : ""
                                    }`}
                                  >
                                    <p className="text-sm">
                                      {notification.text}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {notification.time}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
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
                      <motion.button className="flex items-center space-x-2 focus:outline-none">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                          {user?.displayName?.charAt(0) ??
                            user?.name?.charAt(0)}
                        </div>
                        <span className="text-gray-700 font-medium">
                          {user?.displayName ?? user?.name}
                        </span>
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <motion.div {...dropdownItemAnimation}>
                          <Link
                            href="/profile"
                            className="flex items-center cursor-pointer w-full"
                          >
                            <User size={16} className="mr-2" />
                            Profile
                          </Link>
                        </motion.div>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <motion.div
                          {...dropdownItemAnimation}
                          transition={{ delay: 0.05 }}
                        >
                          <Link
                            href="/settings"
                            className="flex items-center cursor-pointer w-full"
                          >
                            <Settings size={16} className="mr-2" />
                            Settings
                          </Link>
                        </motion.div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <motion.div
                          {...dropdownItemAnimation}
                          transition={{ delay: 0.1 }}
                          onClick={handleLogout}
                          className="text-red-600 focus:text-red-600 cursor-pointer w-full"
                        >
                          <div className="flex items-center w-full">
                            <LogOut size={16} className="mr-2" />
                            Logout
                          </div>
                        </motion.div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.button
                    onClick={() => openAuthDialog("signin")}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
                  >
                    <User size={18} className="mr-1" />
                    Sign In
                  </motion.button>
                  <motion.button
                    onClick={() => openAuthDialog("signup")}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Sign Up
                  </motion.button>
                </motion.div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <motion.div
              className="md:hidden flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                      {...bellAnimation}
                      whileHover="animate"
                    >
                      <Bell className="h-5 w-5 text-gray-700" />
                      <AnimatePresence>
                        {unreadCount > 0 && (
                          <motion.div
                            {...badgeAnimation}
                            className="absolute -top-1 -right-1"
                          >
                            <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                              {unreadCount}
                            </Badge>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <h3 className="font-medium">Notifications</h3>
                      {unreadCount > 0 && (
                        <motion.button
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-800"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Mark all as read
                        </motion.button>
                      )}
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <DropdownMenuItem
                            key={notification.id}
                            className="p-0 focus:bg-transparent"
                          >
                            <motion.div
                              {...dropdownItemAnimation}
                              transition={{
                                delay: index * 0.05,
                              }}
                              className={`w-full p-3 hover:bg-gray-50 cursor-default ${
                                !notification.isRead ? "bg-blue-50" : ""
                              }`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex items-start gap-2">
                                {!notification.isRead && (
                                  <motion.div
                                    className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"
                                    initial={{
                                      scale: 0.5,
                                      opacity: 0.5,
                                    }}
                                    animate={{
                                      scale: 1,
                                      opacity: 1,
                                    }}
                                    transition={{
                                      repeat: Number.POSITIVE_INFINITY,
                                      repeatType: "reverse",
                                      duration: 1.5,
                                    }}
                                  />
                                )}
                                <div
                                  className={`flex-1 ${
                                    !notification.isRead ? "font-medium" : ""
                                  }`}
                                >
                                  <p className="text-sm">{notification.text}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
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
                    <motion.button className="focus:outline-none">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {user?.name}
                      </div>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <motion.div {...dropdownItemAnimation}>
                        <Link
                          href="/profile"
                          className="flex items-center cursor-pointer w-full"
                        >
                          <User size={16} className="mr-2" />
                          Profile
                        </Link>
                      </motion.div>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <motion.div
                        {...dropdownItemAnimation}
                        transition={{ delay: 0.05 }}
                      >
                        <Link
                          href="/settings"
                          className="flex items-center cursor-pointer w-full"
                        >
                          <Settings size={16} className="mr-2" />
                          Settings
                        </Link>
                      </motion.div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <motion.div
                        {...dropdownItemAnimation}
                        transition={{ delay: 0.1 }}
                        onClick={handleLogout}
                        className="text-red-600 focus:text-red-600 cursor-pointer w-full"
                      >
                        <div className="flex items-center w-full">
                          <LogOut size={16} className="mr-2" />
                          Logout
                        </div>
                      </motion.div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <motion.button
                  onClick={() => openAuthDialog("signin")}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  aria-label="Sign in"
                >
                  <User size={20} />
                </motion.button>
              )}
              <motion.button
                className="text-gray-700 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.nav
                className="md:hidden flex flex-col space-y-4 py-4"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <motion.div variants={itemVariants}>
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors block"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link
                    href="/motorcycles"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors block"
                    onClick={() => setIsOpen(false)}
                  >
                    Motorcycles
                  </Link>
                </motion.div>

                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center"
                    >
                      <span className="font-medium">{user?.name}</span>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link
                        href="/profile"
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors inline-flex items-center"
                        onClick={() => setIsOpen(false)}
                      >
                        <User size={18} className="mr-1" />
                        Profile
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link
                        href="/settings"
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors inline-flex items-center"
                        onClick={() => setIsOpen(false)}
                      >
                        <Settings size={18} className="mr-1" />
                        Settings
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
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
                    </motion.div>
                    <motion.div variants={itemVariants}>
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
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <motion.div variants={itemVariants}>
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
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          openAuthDialog("signup");
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors inline-block w-fit"
                      >
                        Sign Up
                      </button>
                    </motion.div>
                  </div>
                )}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Auth Dialog */}
      <AuthDialog
        isOpen={authDialogOpen}
        onClose={closeAuthDialog}
        initialMode={authDialogMode}
      />
    </>
  );
}
