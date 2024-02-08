import React from "react";
import Header from "../Header";;

const DisableHeader = ({ children }) => {
  // Check if the current route should disable the header
  const shouldDisableHeader = () => {
    const disabledRoutes = ["/user/signIn", "/user/signUp", "/user/forgotPassword", "/user/resetPassword"];
    return disabledRoutes.includes(window.location.pathname);
  };

  return (
    <div>
      {shouldDisableHeader() ? null : <Header />}
      {children}
    </div>
  );
};

export default DisableHeader;