import { AuthContext } from "@/context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const stored = localStorage.getItem("user");
  const parsed = stored ? JSON.parse(stored) : null;
  const token = parsed?.token;

  async function getUserData(customerAccessToken) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customerAccessToken}`, // <-- Bearer token here
        },
      });
      const data = await res.json();
      console.log("auth", data);
      return data.data.user;
    } catch (error) {
      console.error("Error fetching customer from backend", error);
      localStorage.removeItem("user");
      setUser(null);
      return null;
    }
  }

  useEffect(() => {
    if (token) {
      getUserData(token).then((user) => {
        if (user) {
          setUser({ ...user, token: token });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, getUserData, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
