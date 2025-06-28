import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.png";

const navItems = [
  { id: 1, name: "Deals", path: "/search-result" },
  { id: 2, name: "Home", path: "/" },
  { id: 3, name: "About", path: "/about" },
  { id: 4, name: "Shop", path: "/shop" },
  { id: 5, name: "Recent Won Bids", path: "/recent-won-bids" },
  {
    id: 6,
    name: "Auction",
    path: "",
    sublinks: [{ id: 1, name: "Action One", path: "#" }],
  },
  { id: 7, name: "Contact", path: "/content" },
];

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-3">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <div key={item.id}>
                <Link
                  to={item.path}
                  className="block py-2 px-3 rounded hover:bg-gray-100 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
                {item.sublinks &&
                  item.sublinks.map((sub) => (
                    <Link
                      to={sub.path}
                      key={sub.id}
                      className="ml-6 text-sm text-gray-600 hover:text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      • {sub.name}
                    </Link>
                  ))}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default MobileNavbar;
