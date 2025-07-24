import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const SellerPrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user && user?.token && user?.email  && user?.type === "seller") {
    return children;
  }

  return <Navigate to={`/${user?.type === "buyer" && user?.card_attributes === true ? "user-dashboard" : "sign-in"}`} state={{ from: location }} />;
};

export default SellerPrivateRoute;
