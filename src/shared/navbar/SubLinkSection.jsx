import React from "react";
import { Link } from "react-router-dom";

const SubLinkSection = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Link className="text-lg" to={"/auction-list"}>
        Fashion
      </Link>
      <Link className="text-lg" to={"/auction-list"}>
        Video game 
      </Link>
      <Link className="text-lg" to={"/auction-list"}>
        Refurbished
      </Link>
    </div>
  );
};

export default SubLinkSection;
