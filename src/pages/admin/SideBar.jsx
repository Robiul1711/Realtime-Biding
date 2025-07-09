import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../../assets/images/logo.png"; // Adjust the path as necessary
import { FaArrowLeftLong } from "react-icons/fa6";
const SideBar = ({ sidebar, open, setOpen }) => {
  const location = useLocation();
  const [activeParentIndex, setActiveParentIndex] = useState(null);

  useEffect(() => {
    sidebar.forEach((item, index) => {
      if (item.sublink) {
        const activeSub = item.sublink.find(
          (sub) => sub.path === location.pathname
        );
        if (activeSub) {
          setActiveParentIndex(index);
        }
      }
    });
  }, [location.pathname, sidebar]);

  const isActive = (paths) => {
    if (!paths) return false;
    const pathArray = Array.isArray(paths) ? paths : [paths];
    return pathArray.includes(location.pathname);
  };

  const isParentActive = (item) => {
    if (!item.sublink) return isActive(item.path);
    return item.sublink.some((sub) => isActive(sub.path));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } xl:hidden z-50`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`h-full py-6  bg-white ${
          open
            ? "left-0 top-0 w-[320px] z-[220] shadow-lg  overflow-y-auto"
            : "-left-full xl:w-[350px] w-[320px] "
        }
         backdrop-blur-md lg:px-8 px-4 flex flex-col gap-8 shadow-md xlg:static fixed transition-all duration-300`}
      >
        {/* Logo */}
        <Link to={"/home"}>
          <div className="flex justify-center items-center">
            <img src={logo} alt="Safe" className="h-24 object-contain" />
            
          </div>
        </Link>

<Link className="border border-[#4275F6] p-2 sm:p-3 rounded-lg flex items-center gap-2 justify-center text-center text-[#4275F6] font-semibold" to="/">
<FaArrowLeftLong />
Back to website
</Link>
        {/* Navigation */}
        <div className="flex flex-col gap-3">
          {sidebar?.map((item, index) => {
            const parentActive = isParentActive(item);
            return !item?.sublink ? (
              <Link
                key={index}
                to={item?.path}
                onClick={() => {
                  setActiveParentIndex(null);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActive(item?.activePaths)
                    ? "bg-[#4275F6] text-[#ffffff]"
                    : "text-[#6D6E75] hover:bg-[#4275F6] hover:text-[#ffffff]"
                }`}
              >
                <span className="text-lg">{item?.icon}</span>
                {item?.text}
              </Link>
            ) : (
              <div className="relative" key={index}>


              </div>
            );
          })}

          {/* Logout */}
          {/* <div className="flex absolute bottom-6 w-[80%] items-center gap-3  cursor-pointer  transition  rounded-lg px-4 py-2">
            <span>
              <IoLogOutOutline color="black" />
            </span>
            <p className="font-medium ">Log Out</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SideBar;
