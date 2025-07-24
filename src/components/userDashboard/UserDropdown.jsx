import React, { useState, useRef, useEffect, use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { PiUserSwitch } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
const UserDropdown = ({
  user,
  onSignOut,
  className = "",
  avatarBgColor = "bg-primary",
  avatarTextColor = "text-white",
  dropdownItems = [],
  scrolled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  console.log("user", user);
  const toastId = useRef(null);

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

  // const switchAccountMutation = useMutation({
  //   mutationFn: async (data) => {
  //     const response = await axiosSecure.post("/switch", data);
  //     return response?.data;
  //   },
  //   onSuccess: (response) => {
  //     navigate("/");
  //     toast.success(response?.message || "Account switched successful");
  //     console.log(response?.data?.type);
  //     setUser({ ...user, type: response?.data?.type });
  //     console.log(response);
  //   },
  //   onError: (error) => {
  //     const errorMessage =
  //       error.response?.data?.message ||
  //       "Something went wrong, try again later!!";
  //     toast.error(errorMessage);
  //   },
  // });


  const switchAccountMutation = useMutation({
  mutationFn: async (data) => {
    return await axiosSecure.post("/switch", data).then(res => res?.data);
  },
  onMutate: () => {
    // Show loading toast and save the toast ID
    toastId.current = toast.loading("Switching account...");
  },
onSuccess: (response) => {
  toast.success(response?.message || "Account switched successfully", {
    id: toastId.current,
  });

  const updatedUser = { ...user, type: response?.data?.type };

  // ✅ Update React state
  setUser(updatedUser);

  // ✅ Also update localStorage
  localStorage.setItem("user", JSON.stringify(updatedUser));


  if (user?.type === "buyer" && user?.card_attributes === false) {
    
      navigate("/profile-setup-1");
    
  } 
  else if (user?.type === "seller") {
    navigate("/seller-dashboard");
  }


},
  onError: (error) => {
    toast.error(
      error.response?.data?.message ||
        "Something went wrong, try again later!!",
      {
        id: toastId.current,
      }
    );
  },
});


  const defaultItems = [
    // {
    //   label: "Profile",
    //   icon: <User className="w-4 h-4 mr-3" />,
    //   href: "/profile",
    // },
    {
      label: user?.type === "buyer" ? "Switch to seller" : "Switch to buyer",
      icon: <PiUserSwitch className="text-lg text-black w-4 h-4 mr-3" />,
      onClick: () =>
        navigate("/").then(() => {
          switchAccountMutation.mutate({
            to_type: user?.type === "buyer" ? "seller" : "buyer",
          });
        }),
    },
    {
      label: "Sign Out",
      icon: <LogOut className="w-4 h-4 mr-3" />,
      onClick: () => LogOutMutation.mutate({}),
    },
  ];

  const items = dropdownItems.length > 0 ? dropdownItems : defaultItems;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUserInitial = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : "U";
  };

  // if (switchAccountMutation.isPending) {
  //   toast.loading("Switching account...");
  // }

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`relative ${className}`}
      ref={dropdownRef}
    >
      {/* Avatar Button */}
      <div className="flex items-center gap-4 cursor-pointer ">
        <button
          className={`flex items-center justify-center sm:w-10 sm:h-10 size-8 rounded-xl font-medium cursor-pointer
          hover:opacity-90 transition-opacity ${avatarBgColor} ${avatarTextColor}
          ${scrolled ? "ring-2 ring-white" : ""}`}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full  rounded-xl object-cover"
            />
          ) : (
            getUserInitial()
          )}
        </button>
        <div className="flex flex-col">
          <p className="font-semibold text-sm sm:text-base text-black">
            {user?.name}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            {/* Switch to seller <PiUserSwitch className="text-lg text-black" /> */}
            {user?.type === "buyer" ? "Buyer" : "Seller"}
          </p>
        </div>
        <FaChevronDown className="sm:text-xl text-black" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white py-2 z-50 border border-gray-100">
          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {items.map((item, index) =>
              item.href ? (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick?.();
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick?.();
                  }}
                  type="button"
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
