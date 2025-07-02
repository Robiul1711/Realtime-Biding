import React from "react";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import UserDropdown from "@/components/userDashboard/UserDropdown";
import { TiThMenu } from "react-icons/ti";
import { useLocation } from "react-router-dom";
const CommonNavbar = ({ open, setOpen }) => {
  const { pathname } = useLocation();
  return (

    <div className={`${pathname==='/user-dashboard/messages' || pathname==='/seller-dashboard/messages' ? "hidden" : "flex items-center gap-5 justify-between w-full py-3 md:py-6 px-0  rounded-2xl"}`}>

    <div
      className={`${
        pathname === "/user-dashboard/messages"
          ? "hidden"
          : "flex items-center gap-5 justify-between w-full py-3 md:py-6 px-0  rounded-2xl"
      }`}
    >

      <div className="flex items-center gap-4">
        <span
          onClick={() => setOpen(!open)}
          className="xlg:hidden block cursor-pointer"
        >
          <TiThMenu className="text-2xl text-[#000]" />
        </span>
      </div>
      <div className="flex items-center md:gap-4 gap-2">
        <span>
          <LuMessageCircleMore className="sm:text-2xl text-xl text-[#6D6E75]" />
        </span>
        <span>
          <IoNotificationsOutline className="sm:text-2xl text-xl text-[#6D6E75]" />
        </span>
        <UserDropdown
          user={{
            name: "user.name",
            email: "user.email",
            avatar: "user.avatar",
          }}
        />
      </div>
      </div>
    </div>
  );
};

export default CommonNavbar;
