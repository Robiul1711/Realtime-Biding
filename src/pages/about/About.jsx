import FairAndSimple from "@/components/about_components/FairAndSimple";
import WelcomeTo from "@/components/about_components/WelcomeTo";
import BigDeal from "@/components/home_components/BigDeal";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const About = () => {
  return (
    <div>
      <ScrollRestoration />
      <WelcomeTo />
      <FairAndSimple />
      <BigDeal />
    </div>
  );
};

export default About;
