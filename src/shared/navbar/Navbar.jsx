import { FireIcon, HeadphoneIcon } from "@/components/common/CustomIcon";
import { Popover } from "antd";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SubLinkSection from "./SubLinkSection";
import { IoMdArrowDropdown } from "react-icons/io";
import Title from "@/components/common/Title";

const Navbar = () => {
  const navItems = [
    {
      id: 1,
      name: "Deals",
      path: "/search-result",
      icon: <FireIcon />,
    },
    {
      id: 2,
      name: "Home",
      path: "/",
    },
    {
      id: 3,
      name: "About",
      path: "/about",
    },
    {
      id: 4,
      name: "Shop",
      path: "/shop",
    },
    {
      id: 5,
      name: "Recent Won Bids",
      path: "/recent-won-bids",
    },
    {
      id: 6,
      name: "Auction",
      path: "/auction-list", // use first sublink path for detection
      sublinks: [
        {
          id: 1,
          name: "Fashion",
          path: "/auction-list",
        },
        {
          id: 2,
          name: "Video Games",
          path: "/auction-list",
        },
      ],
    },
    {
      id: 7,
      name: "Contact",
      path: "/content",
    },
  ];

  const [openPopover, setOpenPopover] = useState(null);
  const location = useLocation();

  const isAuctionActive = navItems
    .find((item) => item.name === "Auction")
    ?.sublinks.some((link) => location.pathname.startsWith(link.path));

  return (
    <header className="section-padding-x w-full fixed top-0 left-0 py-4 border-b border-[#ECECEC] bg-white shadow z-50">
      <div className="hidden md:flex justify-between items-center">
        <nav className="flex items-center xl:gap-8 gap-4 whitespace-nowrap">
          {navItems.map((item, index) => {
            const isActive =
              item.name === "Auction"
                ? isAuctionActive
                : location.pathname === item.path;

            return item?.sublinks ? (
              <Popover
                key={index}
                content={<SubLinkSection items={item.sublinks} />}
                trigger="hover"
                placement="bottom"
                open={openPopover === index}
                onOpenChange={(visible) =>
                  setOpenPopover(visible ? index : null)
                }
                overlayClassName="z-[9999]"
              >
                <div
                  className={`cursor-pointer font-normal flex items-center gap-1 text-lg relative group px-1 border-b-2 ${
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-[#282828] group-hover:border-blue-600 group-hover:text-blue-600"
                  } transition duration-200`}
                >
                  <span>{item.name}</span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      openPopover === index
                        ? "rotate-180"
                        : "group-hover:rotate-180"
                    }`}
                  >
                    <IoMdArrowDropdown color="black" />
                  </span>
                </div>
              </Popover>
            ) : (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `lg:text-lg font-medium px-1 border-b-2 ${
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-[#282828] hover:border-blue-600 hover:text-blue-600"
                  } transition duration-200`
                }
              >
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="lg:flex items-center gap-3 ">
          <span className="hidden lg:block">
            <HeadphoneIcon />
          </span>
          <div className="flex flex-col items-start gap-1">
            <Title level="title12">1900 - 888</Title>
            <Title level="title12">24/7 Support Center</Title>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
