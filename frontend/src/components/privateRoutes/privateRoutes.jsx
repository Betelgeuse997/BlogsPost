import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../Header';

const PrivateRoutes = ({ children }) => {
  const { token } = useAuth(); 
  return token ? <>
                  <Header />
                    {children}
                  </> : <Navigate to="/user/signIn" />;
}

export default PrivateRoutes;