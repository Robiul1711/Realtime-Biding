import Dashboard from "@/components/userDashboard/UserDashboard";
import Layout from "@/layout/Layout";
import About from "@/pages/about/About";
import AuctionList from "@/pages/auction/AuctionList";
import LiveAction from "@/pages/auction/LiveAction";
import RcentWonBid from "@/pages/auction/RcentWonBid_Details";
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
import SearchResult from "@/pages/search_result/SearchResult";

import { createBrowserRouter } from "react-router-dom";
import UserDashboardLayout from "@/layout/UserDashboardLayout";
import SellerDashboardLayout from "@/layout/SellerDashboardLayout";
import SellerDashboard from "@/components/sellerDashboard/SellerDashboard";
import UserDashboard from "@/components/userDashboard/UserDashboard";
import MyAuction from "@/components/userDashboard/MyAuction";
import SearchProductDetails from "@/components/search_result_component/SearchProductDetails";
import WishList from "@/components/userDashboard/WishList";
import UserSetting from "@/components/userDashboard/UserSetting";
import BidHistory from "@/components/userDashboard/BidHistory";
import UserMessaging from "@/components/userDashboard/UserMessaging";
import CreateListingForm from "@/components/sellerDashboard/CreateListingForm";
import PrivateRoute from "@/routes/SellerPrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Join />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
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
      {
        path: "/auction-details",
        element: <LiveAction />,
      },
      {
        path: "/recent-won-details",
        element: <RcentWonBid />,
      },
      {
        path: "/search-result",
        element: <SearchResult />,
      },
      {
        path: "/search-product-details",
        element: <SearchProductDetails />,
      },
    ],
  },
  // Admin routes
  {
    path: "/user-dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        path: "/user-dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/user-dashboard/my-auction",
        element: <MyAuction />,
      },
      {
        path: "/user-dashboard/wishlist",
        element: <WishList />,
      },
      {
        path: "/user-dashboard/messages",
        element: <UserMessaging />,
      },
      {
        path: "/user-dashboard/bid-history",
        element: <BidHistory />,
      },
      {
        path: "/user-dashboard/setting",
        element: <UserSetting />,
      },
    ],
  },
  {
    path: "/seller-dashboard",
    element: <SellerDashboardLayout />,
    children: [
      {
        path: "/seller-dashboard",
        element: <SellerDashboard />, // ✅ Fixed typo
      },
      {
        path: "/seller-dashboard/my-auction",
        element: <MyAuction />,
      },
      {
        path: "/seller-dashboard/wishlist",
        element: <WishList />,
      },
      {
        path: "/seller-dashboard/messages",
        element: <UserMessaging />,
      },
      {
        path: "/seller-dashboard/auction-history",
        element: <BidHistory />,
      },
      {
        path: "/seller-dashboard/setting",
        element: <UserSetting />,
      },
      {
        path: "/seller-dashboard/create-listing",
        element: <CreateListingForm />,
      },
    ],
  },

  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up/:type",
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
    element: (
      <PrivateRoute>
        <ProfileSetup1 />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile-setup-2",
    element: <PrivateRoute><ProfileSetup2 /></PrivateRoute> ,
  },
]);

export default router;
