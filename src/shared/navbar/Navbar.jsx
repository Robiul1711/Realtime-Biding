import { FireIcon, HeadphoneIcon } from "@/components/common/CustomIcon";
import { Popover } from "antd";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SubLinkSection from "./SubLinkSection";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { Title12, Title26 } from "@/components/common/Titles";
const Navbar = () => {
  const navItems = [
    {
      id: 1,
      name: "Deals",
      path: "/deals",
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
      path: "",
      sublinks: [
        {
          id: 1,
          name: "Action One",
          path: "#",
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
  return (
    <header className=" section-padding-x w-full sticky top-0 py-4 border-b border-[#ECECEC] flex justify-between items-center">
      <nav className="xlg:flex hidden items-center xl:gap-8 gap-4 whitespace-nowrap">
        {navItems.map((item, index) =>
          item?.sublinks ? (
            <Popover
              key={index}
              content={<SubLinkSection items={item.sublinks} />}
              trigger="hover"
              placement="bottom"
              open={openPopover === index}
              onOpenChange={(visible) => setOpenPopover(visible ? index : null)}
              overlayClassName="z-[9999]"
            >
              <div className="cursor-pointer font-normal flex items-center gap-1 text-lg text-[#282828] hover-link relative group">
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? " font-bold" : "text-[#282828]"
                    } text-lg font-normal`
                  }
                  to={item.path}
                >
                  {item.name}
                </NavLink>
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
                `${
                  isActive ? "font-bold" : "text-[#282828]"
                } text-lg font-normal`
              }
            >
              {item.name}
            </NavLink>
          )
        )}
      </nav>
      <div className=" flex items-center gap-3">
        <span>
          <HeadphoneIcon />
        </span>
        <div className=" flex flex-col items-start gap-1">
          <Title26>1900 - 888</Title26>
          <Title12>24/7 Support Center</Title12>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
