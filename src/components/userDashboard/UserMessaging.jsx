import React, { useState } from "react";
import user from "../../assets/images/user.png";
import { CiMenuKebab } from "react-icons/ci";
import MessageBox from "./MessageBox";
import { IoChevronBack } from "react-icons/io5";

const UserMessaging = () => {
  const [activeUser, setActiveUser] = useState(null); // For mobile view

  const users = [
    "Mary Freund",
    "Katie Sims",
    "Mary Freund",
    "Kathy Pacheco",
    "David Elson",
    "Rodger Struck",
    "Ricky Smith",
  ];

  const isMobileView = typeof window !== "undefined" && window.innerWidth < 768;

  const handleUserClick = (name) => {
    setActiveUser(name);
  };

  const goBackToUserList = () => {
    setActiveUser(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full text-black rounded-2xl overflow-hidden">
      {/* Sidebar */}
      <div
        className={`w-full md:w-1/3 border-r border-gray-300 flex flex-col ${
          activeUser && isMobileView ? "hidden" : "block"
        }`}
      >
        {/* Header */}
        <div className="p-4">
          <h1 className="sm:text-xl font-bold text-[#4275F6]">
            Messages (04)
          </h1>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 rounded-full bg-white border border-gray-300 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((name, index) => (
            <div
              key={index}
              onClick={() => handleUserClick(name)}
              className="py-3 px-4 rounded-l-xl border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
            >
              <div className="flex gap-3 items-center">
                <img src={user} alt="" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs text-[#4275F6]">May, 28</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm truncate w-[90%]">
                      Hello, How are you....
                    </p>
                    <span className="w-2 h-2 bg-[#4275F6] rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div
        className={`w-full flex flex-col ${
          !activeUser && isMobileView ? "hidden" : "flex"
        }`}
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {isMobileView && (
              <button onClick={goBackToUserList}>
                <IoChevronBack className="text-xl text-gray-600" />
              </button>
            )}
            <img src={user} alt="user" className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="font-semibold text-[#4275F6]">
                {activeUser || "Way Jack"}
              </h2>
              <p className="text-xs text-gray-500">Active</p>
            </div>
          </div>
          <CiMenuKebab className="text-xl text-gray-600 cursor-pointer" />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 w-full overflow-y-auto">
          <MessageBox />
        </div>
      </div>
    </div>
  );
};

export default UserMessaging;
