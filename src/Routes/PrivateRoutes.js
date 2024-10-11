import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../User/UserContext";

/** "Higher-Order Component" for private routes.
 * Redirects to login if user is not authenticated.
 */
function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);

  console.debug(
      "PrivateRoute",
      "currentUser=", currentUser,
  );

  // If there's no current user, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/login" replace />; // Redirect to /login
  }

  // Render children if the user is authenticated
  return children; 
}

export default PrivateRoute;
