import React, { useState } from "react";
import Title from "../common/Title";
import { IoChevronDown } from "react-icons/io5";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Option One", value: "option1" },
  { label: "Option Two", value: "option2" },
  { label: "Option Three", value: "option3" },
  { label: "Option Four", value: "option4" },
  { label: "Option Five", value: "option5" },
];

const filterOptions1 = [
  { label: "All", value: "all" },
  { label: "Ending Soon(24h)", value: "Ending Soon(24h)" },
  { label: "1-3 Days", value: "1-3 Days" },
  { label: "3-7 Days", value: "3-7 Days" },
];

const FilterCard = () => {
  const [checkedOptions, setCheckedOptions] = useState({});
  const [checkedOptions1, setCheckedOptions1] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select Option");

  const options = [
    {
      title: "France",
    },
    {
      title: "Germany",
    },
    {
      title: "India",
    },
    {
      title: "Bangladesh",
    },
    {
      title: "Pakistan",
    },
  ];
  const handleInputChange = (key) => {
    setCheckedOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const handleInputChange1 = (key) => {
    setCheckedOptions1((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="border rounded-xl px-6 py-12">
      <Title level="title24">Filters</Title>
      <div className="mt-4">
        {filterOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-[10px] cursor-pointer mt-4"
          >
            <input
              type="checkbox"
              className="hidden"
              onChange={() => handleInputChange(option.value)}
            />

            {/* Custom Styled Checkbox */}
            <div className="relative">
              {/* Checked state */}
              <span
                className={`${
                  checkedOptions[option.value]
                    ? "opacity-100 z-20 scale-[1]"
                    : "opacity-0 scale-[0.4] z-[-1]"
                } transition-all duration-200 absolute top-0 left-0`}
              >
                {/* Checked SVG */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <rect
                      width="20"
                      height="20"
                      rx="4"
                      className="fill-[#FB0000]"
                      stroke="#3B9DF8"
                    />
                    <path
                      d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>

              {/* Unchecked state */}
              <span
                className={`${
                  !checkedOptions[option.value]
                    ? "opacity-100 z-20 scale-[1]"
                    : "opacity-0 scale-[0.4] z-[-1]"
                } transition-all duration-200`}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <rect
                      width="20"
                      height="20"
                      rx="4"
                      className="fill-transparent"
                      stroke="#ccc"
                    />
                  </g>
                </svg>
              </span>
            </div>

            {/* Label Text */}
            <span className="text-[1.2rem] dark:text-[#abc2d3] text-[#424242]">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      <hr className="border-[1px] border-[#ddd] my-8" />

      <div>
        <Title level="title18" className="font-semibold">
          Time Left
        </Title>
        {filterOptions1.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-[10px] cursor-pointer mt-4"
          >
            <input
              type="checkbox"
              className="hidden"
              onChange={() => handleInputChange1(option.value)}
            />

            {/* Custom Styled Checkbox */}
            <div className="relative">
              {/* Checked state */}
              <span
                className={`${
                  checkedOptions1[option.value]
                    ? "opacity-100 z-20 scale-[1]"
                    : "opacity-0 scale-[0.4] z-[-1]"
                } transition-all duration-200 absolute top-0 left-0`}
              >
                {/* Checked SVG */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <rect
                      width="20"
                      height="20"
                      rx="4"
                      className="fill-[#FB0000]"
                      stroke="#3B9DF8"
                    />
                    <path
                      d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>

              {/* Unchecked state */}
              <span
                className={`${
                  !checkedOptions1[option.value]
                    ? "opacity-100 z-20 scale-[1]"
                    : "opacity-0 scale-[0.4] z-[-1]"
                } transition-all duration-200`}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <rect
                      width="20"
                      height="20"
                      rx="4"
                      className="fill-transparent"
                      stroke="#ccc"
                    />
                  </g>
                </svg>
              </span>
            </div>

            {/* Label Text */}
            <span className="text-[1.2rem] dark:text-[#abc2d3] text-[#424242]">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <hr className="border-[1px] border-[#ddd] my-8" />
      <div className="mt-6">
        <Title level="title18" className="font-semibold">
          Price
        </Title>
        <div className="flex items-center gap-5 w-full mt-3">
          <input
            type="text"
            placeholder="Min"
            className="px-4 py-2 md:py-3 border-2 border-[#BEBBBB] rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Max"
            className="px-4 py-2 md:py-3 border-2 border-[#BEBBBB] rounded-lg w-full"
          />
        </div>
      </div>
      <hr className="border-[1px] border-[#ddd] my-8" />
      <div className="mt-6">
        <Title level="title18" className="font-semibold">
          Location
        </Title>
        <div className="my-4 flex items-center flex-col gap-5 justify-center w-full">
          <button
            className="bg-[#fff] dark:border-slate-600 dark:bg-transparent dark:text-[#6f7478] border-2 border-[#d1d1d1] rounded-md w-full justify-between px-3 py-2 md:py-3 flex items-center  relative cursor-pointer dropdown"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedItem}
            <IoChevronDown
              className={`${
                isDropdownOpen ? " rotate-[180deg]" : " rotate-0"
              } transition-all duration-300 text-[1.2rem]`}
            />
            <div
              className={`${
                isDropdownOpen
                  ? "z-[1] opacity-100 scale-[1]"
                  : "z-[-1] opacity-0 scale-[0.8]"
              } w-full absolute top-12 dark:bg-slate-800 left-0 right-0 z-40 bg-[#fff] rounded-xl flex flex-col  overflow-hidden transition-all duration-300 ease-in-out`}
              style={{
                boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)",
              }}
            >
              {options?.map((option, index) => (
                <p
                  className="py-2 px-4 dark:hover:bg-slate-900/40 hover:bg-[#ececec] transition-all duration-200 flex items-center gap-2"
                  key={index}
                  onClick={(e) => setSelectedItem(e.target.textContent)}
                >
                  {option.title}
                </p>
              ))}
            </div>
          </button>
          <button className="px-4 py-2 md:py-3 rounded-md border-2 border-[#d9d3d3] w-full text-start cursor-pointer">
            City/Region
          </button>
        </div>
      </div>
      <hr className="border-[1px] border-[#ddd] my-8" />
      <div className="mt-6 flex justify-between items-center">
        <p className="text-[17px] font-semibold cursor-pointer hover:underline">
          Clear All
        </p>
        <button className="bg-[#4275F6] text-lg px-5 py-2 md:py-3 rounded-md  hover:bg-[#425af9] text-white cursor-pointer">
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
