import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Simulates navigation
import NavBar from "./NavBar"; // Adjust the import path if needed
import UserContext from "../User/UserContext"; // Adjust the import path if needed

describe("NavBar component", () => {
  const logout = jest.fn(); // Mock logout function

  const renderWithContext = (currentUser) => {
    return render(
      <UserContext.Provider value={{ currentUser }}>
        <MemoryRouter>
          <NavBar logout={logout} />
        </MemoryRouter>
      </UserContext.Provider>
    );
  };

  it("displays correct links when logged out", () => {
    renderWithContext(null); // No user logged in

    expect(screen.getByText("Jobly")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("displays correct links when logged in", () => {
    const currentUser = { username: "testuser" }; // Simulate logged-in user
    renderWithContext(currentUser);

    expect(screen.getByText("Jobly")).toBeInTheDocument();
    expect(screen.getByText("Companies")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("calls logout when 'Log out' is clicked", () => {
    const currentUser = { username: "testuser" }; // Simulate logged-in user
    renderWithContext(currentUser);

    const logoutLink = screen.getByText("Log out");
    fireEvent.click(logoutLink);

    expect(logout).toHaveBeenCalled(); // Check if logout was called
  });
});
