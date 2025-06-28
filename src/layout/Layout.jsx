import Footer from "@/shared/footer/Footer";
import MobileNavbar from "@/shared/navbar/MobileNavbar";
import Navbar from "@/shared/navbar/Navbar";
import Navbar2 from "@/shared/navbar/Navbar2";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
        <Navbar2 />
      </div>
      <MobileNavbar />
      <div className="pt-[64px] md:pt-0">{/* <Outlet /> */}</div>
      <Footer />
    </>
  );
};

export default Layout;
