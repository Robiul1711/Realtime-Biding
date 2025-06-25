import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import Navbar2 from "@/shared/navbar/Navbar2";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Navbar2/>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
