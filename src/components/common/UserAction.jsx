import React, { useState, useEffect } from "react";
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

  const { cart } = useCart();

  

  return (
    <div className="flex flex-row justify-between items-start sm:items-center gap-4 xl:gap-8 w-full xmd:w-auto bg-white py-4 px-8 2xl:px-4">
      {/* Sell */}
      {!user && (
        <Link
          to={`/join`}
          className="relative flex items-center gap-0.5 cursor-pointer"
        >
          <MdOutlineSell className="text-[1.2rem] sm:text-[1.5rem]" />
          <p className="text-customSecondary text-[15px] xl:text-base">Sell</p>
        </Link>
      )}

      {/* Cart */}
      <Link to={`/cart`} className="relative flex items-center gap-3">
        <IoCartOutline className="text-[1.2rem] sm:text-[1.5rem] cursor-pointer" />
        <div className="absolute top-[-50%] left-[17%] text-white min-w-[20px] min-h-[20px] text-center">
          <span className="text-[0.6rem] xl:text-[0.8rem] bg-[#FB0000] py-0.5 px-2 aspect-square rounded-full w-full h-full">
            {cart?.length}
          </span>
        </div>
        <p className="text-customSecondary cursor-pointer text-[15px] xl:text-base">
          Cart
        </p>
      </Link>

      {/* User Account */}
      <div className="relative flex items-center gap-0.5 cursor-pointer">
        {user ? (
          <div className="flex items-center gap-[15px]">
            <div
              className="flex items-center gap-[10px] cursor-pointer relative"
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            >
              <div className="relative">
                <img
                  src={
                    user?.avatar
                      ? `${import.meta.env.VITE_IMG_URL}${user?.avatar}`
                      : DummyUser
                  }
                  alt="avatar"
                  className="w-[35px] h-[35px] rounded-full object-cover"
                />
                <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
              </div>

              <h1 className="text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-600 sm:block hidden">
                {user?.name || "User"}
              </h1>

              <div
                className={`${
                  accountMenuOpen
                    ? "translate-y-0 opacity-100"
                    : isMobile
                    ? "translate-y-[-10px] opacity-0 z-[-1]"
                    : "translate-y-[10px] opacity-0 z-[-1]"
                } bg-white border z-50 w-max rounded-md absolute dark:bg-slate-800 ${
                  isMobile ? "bottom-full mb-2" : "top-[45px]"
                } right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px] shadow-md`}
              >
                <Link
                  to={`${
                    user?.type === "seller"
                      ? "/seller-dashboard"
                      : "/user-dashboard"
                  }`}
                  className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50"
                >
                  <MdDashboard />
                  Go to dashboard
                </Link>

                <Link
                  to={`${
                    user?.type === "seller"
                      ? "/seller-dashboard/setting"
                      : "/user-dashboard/setting"
                  }`}
                  className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50"
                >
                  <IoSettingsOutline />
                  Settings
                </Link>

                <div className="mt-3 border-t dark:border-slate-700 border-gray-200 pt-[5px]">
                  <p
                    onClick={() => LogOutMutation.mutate({})}
                    className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-red-500 dark:hover:bg-red-500/20 text-red-500 hover:bg-red-50 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>

              <IoIosArrowUp
                className={`${
                  accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
                } transition-all duration-300 dark:text-[#abc2d3] text-gray-600 sm:block hidden`}
              />
            </div>

            <CiMenuFries
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="text-[1.8rem] dark:text-[#abc2d3] text-[#424242] cursor-pointer md:hidden flex"
            />
          </div>
        ) : (
          <Link to="/sign-in" className="flex items-center gap-1">
            <ManIcon className="text-[1.2rem] sm:text-[1.5rem]" />
            <p className="text-customSecondary text-[15px] xl:text-base">
              Sign in
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserActions;
