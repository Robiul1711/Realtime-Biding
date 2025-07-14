import CommonNavbar from "@/pages/admin/CommonNavbar";
import SideBar from "@/pages/admin/SideBar";

import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { MdDashboard, MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiAuctionFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
const SellerDashboardLayout = () => {
  const [Open, setOpen] = useState(false);

  const sideBar = [
    {
        id: 1,
        icon: <MdDashboard />,
        text: "Dashboard",
        path: "/seller-dashboard", // main path (optional, if you still want to keep it)
        activePaths: ["/seller-dashboard", "/seller-dashboard/create-listing"], // all paths that should make this item active
        sublink: false,
      },
    {
        id: 1,
        icon: <RiAuctionFill />,
        text: "My Auction",
        path: "/seller-dashboard/my-auction", // main path (optional, if you still want to keep it)
        activePaths: ["/seller-dashboard/my-auction"], // all paths that should make this item active
        sublink: false,
      },
    {
        id: 1,
        icon: <FaRegHeart />,
        text: "WishList",
        path: "/seller-dashboard/wishlist", // main path (optional, if you still want to keep it)
        activePaths: ["/seller-dashboard/wishlist"], // all paths that should make this item active
        sublink: false,
      },
    {
        id: 1,
        icon: <HiOutlineMailOpen />,
        text: "Messages",
        path: "/seller-dashboard/messages", // main path (optional, if you still want to keep it)
        activePaths: ["/seller-dashboard/messages"], // all paths that should make this item active
        sublink: false,
      },
    {
        id: 1,
        icon: <MdHistory />,
        text: "Auction History",
        path: "/seller-dashboard/auction-history", // main path (optional, if you still want to keep it)
        activePaths: ["/seller-dashboard/auction-history"], // all paths that should make this item active
        sublink: false,
      },
    {
        id: 1,
        icon: <IoMdSettings />,
        text: "Setting",
        path: "/seller-dashboard/setting", // main path (optional, if you still want to keep it)
        activePaths: ["/seller-dashboard/setting"], // all paths that should make this item active
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
      <div className="flex  h-screen min-h-screen w-full">
        <SideBar open={Open} setOpen={setOpen} sidebar={sideBar} />
        <div className="flex-1 bg-dark text-white flex flex-col overflow-auto custom-scrollbar">
          <div className=" flex flex-col">
            <CommonNavbar open={Open} setOpen={setOpen} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashboardLayout;
