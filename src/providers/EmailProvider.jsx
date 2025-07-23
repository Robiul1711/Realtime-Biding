import { EmailContext } from "@/context";
import { useState } from "react";

const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState({});
  const [searchResults, setSearchResults] = useState([]);
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
        search,
        setSearch,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
