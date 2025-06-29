import React from "react";
import { NavLink } from "react-router-dom";

const SubLinkSection = ({ items }) => {
  return (
    <div className="rounded w-36">
      {items?.map((link) => (
        <NavLink
          key={link.id}
          to={link.path}
          className={({ isActive }) =>
            `block py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
              isActive
                ? "text-black font-medium bg-gray-100"
                : "text-black hover:text-black hover:bg-gray-100"
            }`
          }
          style={{ color: "black" }}
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default SubLinkSection;
