import React, { useState, useEffect, useRef } from "react";

import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline, IoSettingsOutline } from "react-icons/io5";
import { MdDashboard, MdOutlineSell } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { IoIosArrowUp } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { ManIcon } from "./CustomIcon";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useCart } from "@/hooks/useCart";
import DummyUser from "@/assets/images/placeholder-user.png";

const UserActions = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
const accountMenuRef = useRef(null);

  // Check if mobile screen
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1025);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const LogOutMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post("/logout", data);
      return response?.data;
    },
    onSuccess: (response) => {
      toast.success(response?.message || "Logout successful");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      accountMenuRef.current &&
      !accountMenuRef.current.contains(event.target)
    ) {
      setAccountMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const { cart } = useCart();

  return (
<div className="flex  items-center justify-between gap-4 xl:gap-8 w-full bg-white py-4 px-4 md:px-8">
  {/* Sell */}
  {!user && (
    <Link to="/join" className="flex items-center gap-1">
      <MdOutlineSell className="text-xl sm:text-2xl" />
      <p className="text-customSecondary text-sm sm:text-base">Sell</p>
    </Link>
  )}

  {/* Cart */}
  <Link to="/cart" className="relative flex items-center gap-2">
    <IoCartOutline className="text-xl sm:text-2xl" />
    <div className="absolute -top-2 left-4 text-white text-center">
      <span className="text-[0.6rem] xl:text-[0.8rem] bg-[#FB0000] py-0.5 px-1.5 rounded-full">
        {cart?.length}
      </span>
    </div>
    <p className="text-customSecondary text-sm sm:text-base">Cart</p>
  </Link>

  {/* User Menu or Sign In */}
  <div className="relative">
    {user ? (
      <div className="flex items-center gap-2 sm:gap-4" ref={accountMenuRef}>
        {/* Avatar and Info */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setAccountMenuOpen((prev) => !prev)}
        >
          <img
            src={
              user?.avatar
                ? `${import.meta.env.VITE_IMG_URL}${user?.avatar}`
                : DummyUser
            }
            className="w-[35px] h-[35px] rounded-full object-cover"
            alt="avatar"
          />
          <div className="hidden sm:block">
            <h1 className="text-sm text-gray-600 dark:text-[#abc2d3]">
              {user?.name || "User"}
            </h1>
            <p className="text-xs text-gray-600 capitalize dark:text-[#abc2d3]">
              {user?.type}
            </p>
          </div>
          <IoIosArrowUp
            className={`${
              accountMenuOpen ? "rotate-0" : "rotate-180"
            } transition-all duration-300 hidden sm:block text-gray-600 dark:text-[#abc2d3]`}
          />
        </div>

        {/* Dropdown */}
        <div
          className={`${
            accountMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          } absolute ${
            isMobile ? "bottom-[120%]" : "top-full"
          } right-0 z-50 min-w-[200px] bg-white dark:bg-slate-800 rounded-md shadow-md p-2 transition-all duration-300`}
        >
          <Link
            to={
              user?.type === "seller"
                ? "/seller-dashboard"
                : "/user-dashboard"
            }
            className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-[#abc2d3]"
          >
            <MdDashboard className="inline mr-2" />
            Dashboard
          </Link>
          <Link
            to={
              user?.type === "seller"
                ? "/seller-dashboard/setting"
                : "/user-dashboard/setting"
            }
            className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-[#abc2d3]"
          >
            <IoSettingsOutline className="inline mr-2" />
            Settings
          </Link>
          <div className="border-t mt-2 pt-2">
            <p
              onClick={() => LogOutMutation.mutate({})}
              className="block px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer"
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    ) : (
      <Link to="/sign-in" className="flex items-center gap-1 w-[100px]">
        <ManIcon className="text-xl sm:text-2xl" />
        <p className="text-customSecondary text-sm sm:text-base">Sign in</p>
      </Link>
    )}
  </div>
</div>

  );
};

export default UserActions;
