import { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [tokenExpiration, setTokenExpiration] = useState(
    sessionStorage.getItem("tokenExpiration")
  );
  const [token, setToken] = useState(sessionStorage.getItem("jwtToken"));
  const [userId, setUserId] = useState("");
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");

  const navigate = useNavigate();

  const login = (authToken, userId, name, email) => {
    try {
      console.log(jwtDecode(authToken));
      const decoded = jwtDecode(authToken);
      const expirationTimestamp = decoded.exp;
      const expirationDate = new Date(expirationTimestamp * 1000);

      sessionStorage.setItem("jwtToken", authToken);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("tokenExpiration", expirationDate.toString());

      setToken(authToken);
      setUserId(userId);
      setName(name);
      setEmail(email);
      setTokenExpiration(expirationDate.toString());
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("tokenExpiration");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");

    setToken("");
    setTokenExpiration("");
    setUserId("");
    setName("");
    setEmail("");

    navigate("/user/signIn");
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = sessionStorage.getItem("jwtToken");
      const storedUserId = sessionStorage.getItem("userId");
      setToken(storedToken);
      setUserId(storedUserId);
      if (storedToken && tokenExpiration) {
        const currentTime = new Date().getTime();
        const expirationTime = new Date(tokenExpiration).getTime();

        if (currentTime >= expirationTime) {
          console.log("From auth context: token expired");
          logout();
        }
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 10000);
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tokenExpiration, logout]);

  return (
    <AuthContext.Provider value={{ token, userId, name, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};