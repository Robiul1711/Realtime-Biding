import UserActions from "@/components/common/UserAction";
import Footer from "@/shared/footer/Footer";
import MobileNavbar from "@/shared/navbar/MobileNavbar";
import Navbar from "@/shared/navbar/Navbar";
import Navbar2 from "@/shared/navbar/Navbar2";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="">
        <Navbar />
        <Navbar2 />
      </div>
      <MobileNavbar />
      <div className="">
        <Outlet />
      </div>
      <Footer />
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white">
        <UserActions />
      </div>
    </>
  );
};

export default Layout;
