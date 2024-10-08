import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "../user/UserContext";

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const loggedInNav = () => {
    return (
      <div>
        <Navbar expand="md">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink exact to="/" className="navbar-brand">
                Jobly
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink exact to="/companies" className="navbar-brand">
                Companies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/jobs" className="navbar-brand">
                Jobs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/profile" className="navbar-brand">
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <Link className="navbar-brand" to="/" onClick={logout}>
                Log out
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }

  const loggedOutNav = () => {
    return (
      <div>
        <Navbar expand="md">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink exact to="/" className="navbar-brand">
                Jobly
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink exact to="/login" className="navbar-brand">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/signup" className="navbar-brand">
                Sign up
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }

  return (
    <div>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </div>
  );
};

export default NavBar;
