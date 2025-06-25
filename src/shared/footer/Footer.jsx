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
    <div className="section-padding-x ">
      <div className="flex justify-between gap-10 md:gap-24 lg:gap-36">
        <div className="w-full md:w-[74%]">
          <CardIcon />
          <p className="text-[#253D4E] text-lg mb-2">
            Awesome grocery store website <br /> template
          </p>
          <div className="flex justify-between items-center gap-8 mt-6 text-[#253D4E]">
            <div className="">
              <div className="flex items-center gap-2">
                <Location />
                <p>
                  <span className="text-[#253D4E] text-[17px] font-medium">
                    Address :
                  </span>{" "}
                  5171 W Campbell Ave
                </p>
              </div>
              <p>undefined Kent, Utah 53127 United States</p>
            </div>
            <div className="flex items-center gap-2">
              <Headphone />
              <p>
                {" "}
                <span className="text-[#253D4E] text-[17px] font-medium">
                  Call Us :
                </span>{" "}
                (+91) - 540-025-124553
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FlyIcon />
              <p>
                {" "}
                <span className="text-[#253D4E] text-[17px] font-medium">
                  Email :
                </span>{" "}
                sale@Nest.com
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon />
              <p>
                {" "}
                <span className="text-[#253D4E] text-[17px] font-medium">
                  Hours :
                </span>{" "}
                10:00 - 18:00, Mon - Sat
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:flex-1">
          <p className="text-[#253D4E] text-lg md:text-[26px] font-semibold mb-4">
            Install App
          </p>
          <div className="flex items-center gap-2">
            <img src={app} alt="image" />
            <img src={google} alt="image" />
          </div>
        </div>
      </div>

      <hr className="mt-12 mb-6 " />
      <div className="flex items-center justify-between my-4">
        <div className="text-customSecondary">
          <p>© 2022, HTML Ecommerce Template</p>
          <p>All rights reserved</p>
        </div>
        <div className="flex items-center gap-12">
          <div>
            <div className="flex items-center gap-x-4">
              <CallIcon />
              <div>
                <h2 className="text-[26px] font-semibold">1900 - 6666</h2>
                <p className="text-customSecondary">Working 8:00 - 22:00</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <CallIcon />
              <div>
                <h2 className="text-[26px] font-semibold">1900 - 8888</h2>
                <p className="text-customSecondary">Working 8:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-2xl text-[#253D4E] font-semibold">Follow Us</h2>
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
