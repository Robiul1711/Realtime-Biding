import Dashboard from "@/components/admin/Dashboard";
import AdminLayout from "@/layout/AdminLayout";
import Layout from "@/layout/Layout";
import About from "@/pages/about/About";
import AuctionList from "@/pages/auction/AuctionList";
import Join from "@/pages/auth/Join";
import NewPassword from "@/pages/auth/NewPassword";
import ProfileSetup1 from "@/pages/auth/ProfileSetup1";
import ProfileSetup2 from "@/pages/auth/ProfileSetup2";
import ResetPassword from "@/pages/auth/ResetPassword";
import ResetSuccessfull from "@/pages/auth/ResetSuccessfull";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Verification from "@/pages/auth/Verification";
import Home from "@/pages/home/Home";
import RecentWonBids from "@/pages/recent_Won_Bids/RecentWonBids";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/recent-won-bids",
        element: <RecentWonBids />,
      },
  {
        path: "/auction-list",
        element: <AuctionList />,
      },
    ],
  },
  // Admin routes
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />, // ✅ Fixed typo
      },
    ],
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  {
    path: "/reset-successfull",
    element: <ResetSuccessfull />,
  },
  {
    path: "/profile-setup-1",
    element: <ProfileSetup1 />,
  },
  {
    path: "/profile-setup-2",
    element: <ProfileSetup2 />,
  },
]);

export default router;
