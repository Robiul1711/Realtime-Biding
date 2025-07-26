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
import { Link } from "react-router-dom";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Footer = () => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const axiosPublic = useAxiosPublic();
  
  const { data } = useQuery({
    queryKey: ["settings"],
    queryFn: () => {
      return axiosPublic.get("/settings");
    },
  });

  const settings = data?.data?.data;

  return (
    <div className="section-padding-x">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-24 xl:gap-36">
        {/* Left Column */}
        <div className="w-full lg:w-[74%]">
          {settings?.logo && (
            <Link to="/">
              <img className="w-40" src={IMG_URL + settings.logo} alt="logo" />
            </Link>
          )}
          
          {(settings?.footer_text || settings?.title) && (
            <p className="text-[#253D4E] text-lg mb-2">
              {settings?.footer_text || settings?.title}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 mt-6 text-[#253D4E]">
            {settings?.address && (
              <div className="flex items-start gap-2 min-w-[230px]">
                <Location />
                <div>
                  <p>
                    <span className="text-[#253D4E] text-[17px] font-medium">
                      Address :
                    </span>{" "}
                    {settings.address}
                  </p>
                </div>
              </div>
            )}

            {(settings?.phone_code || settings?.phone_number) && (
              <div className="flex items-center gap-2 min-w-[230px]">
                <Headphone />
                <p>
                  <span className="text-[#253D4E] text-[17px] font-medium">
                    Call Us :
                  </span>{" "}
                  {settings?.phone_code} {settings?.phone_number}
                </p>
              </div>
            )}

            {settings?.email && (
              <div className="flex items-center gap-2 min-w-[230px]">
                <FlyIcon />
                <p>
                  <span className="text-[#253D4E] text-[17px] font-medium">
                    Email :
                  </span>{" "}
                  {settings.email}
                </p>
              </div>
            )}

            {settings?.office_time && (
              <div className="flex items-center gap-2 min-w-[230px]">
                <ClockIcon />
                <p>
                  <span className="text-[#253D4E] text-[17px] font-medium">
                    Hours :
                  </span>{" "}
                  {settings.office_time}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Always shown as it's not from API */}
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

      {settings && (
        <>
          <hr className="mt-12 mb-6" />

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between mt-4 mb-16 lg:mb-4">
            {/* Left Text */}
            {settings?.copyright && (
              <div className="text-customSecondary">
                <p>{settings.copyright}</p>
              </div>
            )}

            {/* Social Section - Always shown as it's not from API */}
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
        </>
      )}
    </div>
  );
};

export default Footer;