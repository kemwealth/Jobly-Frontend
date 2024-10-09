import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom"; 
import AppRoutes from "./AppRoutes"; // Adjust the import path as needed
import UserContext from "../User/UserContext"; // Adjust the import path as needed

// Mock the required components
jest.mock("../Home/Home", () => () => <div>Home</div>);
jest.mock("../Companies/CompaniesList", () => () => <div>Companies List</div>);
jest.mock("../Companies/Company", () => () => <div>Company</div>);
jest.mock("../Jobs/JobList", () => () => <div>Jobs List</div>);
jest.mock("../User/SignupForm", () => () => <div>Signup</div>);
jest.mock("../User/LoginForm", () => () => <div>Login</div>);
jest.mock("../User/Profile", () => () => <div>Profile</div>);
jest.mock("./PrivateRoutes", () => ({ children }) => <div>{children}</div>); // Mock PrivateRoute

describe("AppRoutes component", () => {
    const signup = jest.fn();
    const login = jest.fn();

    const renderWithContext = (currentUser) => {
        return render(
            <UserContext.Provider value={{ currentUser }}>
                <MemoryRouter initialEntries={["/"]}>
                    <AppRoutes signup={signup} login={login} />
                </MemoryRouter>
            </UserContext.Provider>
        );
    };

    it("renders the home page by default", () => {
        renderWithContext(null); // No user logged in
        expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("renders the companies page when user is logged in", () => {
        renderWithContext({ firstName: "John", username: "john_doe" }); // Simulate a logged-in user
        screen.getByText("Companies List"); // This line checks if Companies List is displayed
    });

    it("renders the login page when accessing /login", () => {
        renderWithContext(null); // No user logged in
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <AppRoutes signup={signup} login={login} />
            </MemoryRouter>
        );
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("renders the signup page when accessing /signup", () => {
        renderWithContext(null); // No user logged in
        render(
            <MemoryRouter initialEntries={["/signup"]}>
                <AppRoutes signup={signup} login={login} />
            </MemoryRouter>
        );
        expect(screen.getByText("Signup")).toBeInTheDocument();
    });

    it("redirects to home when accessing an unknown route", () => {
        renderWithContext(null); // No user logged in
        render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <AppRoutes signup={signup} login={login} />
            </MemoryRouter>
        );
        expect(screen.getByText("Home")).toBeInTheDocument(); // Should redirect to home
    });

    it("renders the profile page when user is logged in", () => {
        renderWithContext({ firstName: "John", username: "john_doe" }); // Simulate a logged-in user
        render(
            <MemoryRouter initialEntries={["/profile"]}>
                <AppRoutes signup={signup} login={login} />
            </MemoryRouter>
        );
        expect(screen.getByText("Profile")).toBeInTheDocument(); // Should show the Profile component
    });
});
