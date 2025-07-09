import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  console.log(user)

  if (user && user?.token && user?.email ) {
    return children;
  }

  return <Navigate to="/sign-in" state={{ from: location }} />;
};

export default PrivateRoute;