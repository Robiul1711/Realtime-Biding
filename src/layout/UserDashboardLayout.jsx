import CommonNavbar from "@/pages/admin/CommonNavbar";
import SideBar from "@/pages/admin/SideBar";

import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
const UserDashboardLayout = () => {
  const [Open, setOpen] = useState(false);

  const sideBar = [
    {
        id: 1,
        icon: <MdDashboard />,
        text: "Dashboard",
        path: "/user-dashboard", // main path (optional, if you still want to keep it)
        activePaths: ["/user-dashboard"], // all paths that should make this item active
        sublink: false,
      },
    {
        id: 1,
        icon: <RiAuctionFill />,
        text: "My Auction",
        path: "/user-dashboard/my-auction", // main path (optional, if you still want to keep it)
        activePaths: ["/user-dashboard/my-auction"], // all paths that should make this item active
        sublink: false,
      },
    {
        id: 1,
        icon: <HiOutlineMailOpen />,
        text: "Messages",
        path: "/messages", // main path (optional, if you still want to keep it)
        // activePaths: ["/dashboard", "/dashboard/settings", "/dashboard/analytics"], // all paths that should make this item active
        sublink: false,
      },
    {
        id: 1,
        icon: <MdHistory />,
        text: "Bid History",
        path: "/bid-history", // main path (optional, if you still want to keep it)
        // activePaths: ["/dashboard", "/dashboard/settings", "/dashboard/analytics"], // all paths that should make this item active
        sublink: false,
      },
    {
        id: 1,
        icon: <IoMdSettings />,
        text: "Setting",
        path: "/setting", // main path (optional, if you still want to keep it)
        // activePaths: ["/dashboard", "/dashboard/settings", "/dashboard/analytics"], // all paths that should make this item active
        sublink: false,
      },

  ];
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <>
      <ScrollRestoration />
      <div className="flex  h-screen min-h-screen w-full bg-[#F3F3F3]">
        <SideBar open={Open} setOpen={setOpen} sidebar={sideBar} />
        <div className="flex-1 bg-dark text-white flex flex-col overflow-auto custom-scrollbar">
          <div className=" flex flex-col lg:gap-10 gap-5 lg:py-6 py-3 lg:px-[30px] px-2.5 sm:px-5">
            <CommonNavbar open={Open} setOpen={setOpen} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboardLayout;
