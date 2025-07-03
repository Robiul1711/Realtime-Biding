import {
  CallIcon,
  CardIcon,
  ClockIcon,
  Facebook,
  FlyIcon,
  Headphone,
  Instragram,
  Location,
  Printest,
  Twitter,
  Youtube,
} from "@/components/common/CustomIcon";
import React from "react";
import app from "../../assets/images/appstore.png";
import google from "../../assets/images/googlestore.png";

const Footer = () => {
  return (
    <div className="section-padding-x">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 md:gap-24 lg:gap-36">
        {/* Left Column */}
        <div className="w-full lg:w-[74%]">
          <CardIcon className="w-32 h-32 md:h-auto" />
          <p className="text-[#253D4E] text-lg mb-2">
            Awesome grocery store website <br /> template
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 mt-6 text-[#253D4E]">
            <div className="flex items-start gap-2 min-w-[230px]">
              <Location />
              <div>
                <p>
                  <span className="text-[#253D4E] text-[17px] font-medium">
                    Address :
                  </span>{" "}
                  5171 W Campbell Ave
                </p>
                <p>undefined Kent, Utah 53127 United States</p>
              </div>
            </div>

            <div className="flex items-center gap-2 min-w-[230px]">
              <Headphone />
              <p>
                <span className="text-[#253D4E] text-[17px] font-medium">
                  Call Us :
                </span>{" "}
                (+91) - 540-025-124553
              </p>
            </div>

            <div className="flex items-center gap-2 min-w-[230px]">
              <FlyIcon />
              <p>
                <span className="text-[#253D4E] text-[17px] font-medium">
                  Email :
                </span>{" "}
                sale@Nest.com
              </p>
            </div>

            <div className="flex items-center gap-2 min-w-[230px]">
              <ClockIcon />
              <p>
                <span className="text-[#253D4E] text-[17px] font-medium">
                  Hours :
                </span>{" "}
                10:00 - 18:00, Mon - Sat
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-auto">
          <p className="text-[#253D4E] text-lg md:text-[26px] font-semibold mb-4">
            Install App
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <img src={app} alt="App Store" />
            <img src={google} alt="Google Play" />
          </div>
        </div>
      </div>

      <hr className="mt-12 mb-6" />

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-between mt-4  mb-16 lg:mb-4">
        {/* Left Text */}
        <div className="text-customSecondary">
          <p>© 2025, HTML Ecommerce Template</p>
          <p>All rights reserved</p>
        </div>

        {/* Phone Info */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex items-center gap-x-4">
            <CallIcon />
            <div>
              <h2 className="sm:text-[20px] lg:text-[26px] font-semibold">
                1900 - 6666
              </h2>
              <p className="text-customSecondary text-sm sm:text-base">
                Working 8:00 - 22:00
              </p>
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <CallIcon />
            <div>
              <h2 className="sm:text-[20px] lg:text-[26px] font-semibold">
                1900 - 8888
              </h2>
              <p className="text-customSecondary text-sm sm:text-base">
                Working 8:00 - 22:00
              </p>
            </div>
          </div>
        </div>

        {/* Social Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h2 className="text-[20px] lg:text-[26px] text-[#253D4E] font-semibold">
              Follow Us
            </h2>
            <div className="flex items-center gap-3">
              <div className="cursor-pointer bg-[#FB0000] p-1 rounded-full">
                <Facebook className="w-[20px] h-[20px]" />
              </div>
              <div className="cursor-pointer bg-[#FB0000] p-1 rounded-full">
                <Twitter className="w-[20px] h-[20px]" />
              </div>
              <div className="cursor-pointer bg-[#FB0000] p-1 rounded-full">
                <Instragram className="w-[20px] h-[20px]" />
              </div>
              <div className="cursor-pointer bg-[#FB0000] p-1 rounded-full">
                <Printest className="w-[20px] h-[20px]" />
              </div>
              <div className="cursor-pointer bg-[#FB0000] p-1 rounded-full">
                <Youtube className="w-[20px] h-[20px]" />
              </div>
            </div>
          </div>
          <p className="text-customSecondary my-1">
            Up to 15% discount on your first subscribe
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
