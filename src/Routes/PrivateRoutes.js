import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "../User/UserContext";

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateRoute({ path, children }) {
  const { currentUser } = useContext(UserContext);

  console.debug(
      "PrivateRoute",
      "path=", path,
      "currentUser=", currentUser,
  );

  // If there's no current user, redirect to the login page
  if (currentUser === null) {
    return <Navigate to="/login" replace />; // Redirect to /login instead of /
  }

  return (
      <Route path={path} element={children} /> // Use element prop to render children
  );
}

export default PrivateRoute;
