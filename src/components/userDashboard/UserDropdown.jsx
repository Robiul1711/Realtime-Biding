import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";

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

  const defaultItems = [
    {
      label: "Profile",
      icon: <User className="w-4 h-4 mr-3" />,
      href: "/profile",
    },
    {
      label: "Settings",
      icon: <Settings className="w-4 h-4 mr-3" />,
      href: "/settings",
    },
    {
      label: "Sign Out",
      icon: <LogOut className="w-4 h-4 mr-3" />,
      onClick: onSignOut,
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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 rounded-xl font-medium cursor-pointer
          hover:opacity-90 transition-opacity ${avatarBgColor} ${avatarTextColor}
          ${scrolled ? "ring-2 ring-white" : ""}`}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-xl object-cover"
          />
        ) : (
          getUserInitial()
        )}

      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white py-2 z-50 border border-gray-100">
          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
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
