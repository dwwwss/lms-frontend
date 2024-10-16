import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { validToken } from "../api/user";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element: Component, admin, ...rest }) => {
    const token = useSelector((state) => state.user.token);
    const userRole = useSelector((state) => state.user.roleId);

    useEffect(() => {
        const checkTokenValidity = async () => {
            if (token) {
                try {
                    await validToken(token);
                } catch (error) {
                    return <Navigate to="/" replace />;
                }
            }
        };

        checkTokenValidity();
    }, [token]);

    if (!token) {
    return <Navigate to="/" replace />;
  }

  if (userRole === null) {
    return null;
  }

  if (admin && userRole !== 2) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
