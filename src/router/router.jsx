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
import PrivateRoute from "@/routes/PrivateRoute";
import SellerPrivateRoute from "@/routes/SellerPrivateRoute";
import BuyerPrivateRoute from "@/routes/BuyerPrivateRoute";
import { PublicRoute } from "@/routes/PublicRoute";
import SellerMessaging from "@/components/sellerDashboard/SellerMessaging";

const router = createBrowserRouter([
  {
    path: "/join",
    element: <Join />,
  },
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
      {
        path: "/auction-details/:id",
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
        element: <BuyerPrivateRoute><UserDashboard /></BuyerPrivateRoute>,
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
        element: (
          <SellerPrivateRoute>
            {" "}
            <SellerDashboard />{" "}
          </SellerPrivateRoute>
        ), // ✅ Fixed typo
      },
      {
        path: "/seller-dashboard/my-auction",
        element: (
          <SellerPrivateRoute>
            <MyAuction />
          </SellerPrivateRoute>
        ),
      },
      {
        path: "/seller-dashboard/wishlist",
        element: (
          <SellerPrivateRoute>
            <WishList />
          </SellerPrivateRoute>
        ),
      },
      {
        path: "/seller-dashboard/messages",
        element: (
          <SellerPrivateRoute>
            <SellerMessaging />
          </SellerPrivateRoute>
        ),
      },
      {
        path: "/seller-dashboard/auction-history",
        element: (
          <SellerPrivateRoute>
            <BidHistory />
          </SellerPrivateRoute>
        ),
      },
      {
        path: "/seller-dashboard/setting",
        element: (
          <SellerPrivateRoute>
            <UserSetting />
          </SellerPrivateRoute>
        ),
      },
      {
        path: "/seller-dashboard/create-listing",
        element: (
          <SellerPrivateRoute>
            <CreateListingForm />
          </SellerPrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/sign-in",
    element: <PublicRoute><SignIn /></PublicRoute> ,
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
    element: (
      <PrivateRoute>
        <ProfileSetup2 />
      </PrivateRoute>
    ),
  },
]);

export default router;
