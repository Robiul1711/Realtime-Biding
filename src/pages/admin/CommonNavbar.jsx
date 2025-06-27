import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import React from "react";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import UserDropdown from "@/components/userDashboard/UserDropdown";
const CommonNavbar = ({ open, setOpen }) => {

  return (
    <div className="flex items-center gap-5 justify-end w-full py-3 md:py-6 px-0  rounded-2xl">

      <div className="flex items-center md:gap-4 gap-2">
        <span>
        <LuMessageCircleMore className="text-2xl text-[#6D6E75]"/>
        </span>
        <span>
          <IoNotificationsOutline className="text-2xl text-[#6D6E75]"/>
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
  );
};

export default CommonNavbar;
