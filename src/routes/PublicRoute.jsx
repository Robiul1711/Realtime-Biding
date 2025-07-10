import { useAuth } from '@/hooks/useAuth';
import React from 'react'
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({children}) => {
  const { user } = useAuth(); // Replace with your actual auth logic

  // Redirect if user is already logged in
  if (user) {
    if (user?.type === "seller") {
      return <Navigate to="/seller-dashboard" replace />;
    } else if (user?.type === "buyer") {
      return <Navigate to="/user-dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
