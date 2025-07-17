import { EmailContext } from "@/context";
import { useState } from "react";

const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [product, setProduct] = useState({});
  return (
    <EmailContext.Provider
      value={{
        email,
        setEmail,
        resetToken,
        setResetToken,
        product,
        setProduct,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
