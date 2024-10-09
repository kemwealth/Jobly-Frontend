import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "../User/UserContext"; // Make sure the path is correct
import Home from "./Home";

describe("Home component", () => {
  it("renders welcome message for logged-in users", () => {
    const currentUser = { firstName: "John", username: "john_doe" };

    render(
      <UserContext.Provider value={{ currentUser }}>
        <Router>
          <Home />
        </Router>
      </UserContext.Provider>
    );

    // Check if the welcome message is rendered
    expect(screen.getByText(/Welcome Back, John!/i)).toBeInTheDocument();
  });

  it("renders login and signup links for guests", () => {
    render(
      <UserContext.Provider value={{ currentUser: null }}>
        <Router>
          <Home />
        </Router>
      </UserContext.Provider>
    );

    // Check if the login and signup buttons are rendered
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });

  it("renders the main heading and description", () => {
    render(
      <UserContext.Provider value={{ currentUser: null }}>
        <Router>
          <Home />
        </Router>
      </UserContext.Provider>
    );

    // Check if the main heading and description are rendered
    expect(screen.getByRole("heading", { name: /Find and apply for the best Jobs with JOBLY/i })).toBeInTheDocument();
    expect(screen.getByText(/Discover new opportunities and apply privately using our applications/i)).toBeInTheDocument();
  });
});
