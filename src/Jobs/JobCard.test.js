import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserContext } from "../User/UserContext"; // Adjust the import as necessary
import JobCard from "./JobCard"; // Adjust the import as necessary

describe("JobCard component", () => {
    const mockJobApplied = jest.fn();
    const mockJobApply = jest.fn();

    const setup = (applied = false) => {
        // Mocking the context values
        const contextValue = {
            jobApplied: (id) => applied, // Return if the job is applied or not
            jobApply: mockJobApply, // Mock jobApply function
        };

        render(
            <UserContext.Provider value={contextValue}>
                <JobCard id={1} title="Software Engineer" salary={80000} equity={0.05} companyName="Tech Company" />
            </UserContext.Provider>
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders correctly with given props", () => {
        setup();

        expect(screen.getByText("Software Engineer")).toBeInTheDocument();
        expect(screen.getByText("Tech Company")).toBeInTheDocument();
        expect(screen.getByText(/Salary: 80,000/i)).toBeInTheDocument();
        expect(screen.getByText(/Equity: 0.05/i)).toBeInTheDocument();
    });

    it("shows 'Apply' when the job has not been applied for", () => {
        setup(false);

        const applyButton = screen.getByRole("button", { name: /Apply/i });
        expect(applyButton).toBeInTheDocument();
        expect(applyButton).not.toBeDisabled();
    });

    it("shows 'Applied' and disables the button after clicking 'Apply'", () => {
        setup(false);

        const applyButton = screen.getByRole("button", { name: /Apply/i });
        fireEvent.click(applyButton);

        expect(mockJobApply).toHaveBeenCalledTimes(1);
        expect(screen.getByRole("button", { name: /Applied/i })).toBeInTheDocument();
        expect(applyButton).toBeDisabled();
    });

    it("does not call jobApply if the job has already been applied", () => {
        setup(true);

        const applyButton = screen.getByRole("button", { name: /Applied/i });
        fireEvent.click(applyButton);

        expect(mockJobApply).not.toHaveBeenCalled();
    });
});
