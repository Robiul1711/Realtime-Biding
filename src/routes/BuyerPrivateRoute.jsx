import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const BuyerPrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  console.log(user)

  if (user && user?.token && user?.email && user?.type==="buyer" ) {
    return children;
  }

  return <Navigate to="/sign-in" state={{ from: location }} />;
};

export default BuyerPrivateRoute;