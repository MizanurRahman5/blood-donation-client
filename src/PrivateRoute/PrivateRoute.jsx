import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContex } from '../Provider/AuthProvider';


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContex); // ইউজার তথ্য AuthContext থেকে আনুন

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
