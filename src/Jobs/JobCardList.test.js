import React from "react";
import { render, screen } from "@testing-library/react";
import JobCardList from "./JobCardList"; // Adjust the import as necessary

describe("JobCardList component", () => {
    const mockJobs = [
        { id: 1, title: "Software Engineer", salary: 80000, equity: 0.05, companyName: "Tech Company" },
        { id: 2, title: "Product Manager", salary: 90000, equity: 0.03, companyName: "Business Corp" },
    ];

    it("renders JobCard components when jobs are provided", () => {
        render(<JobCardList jobs={mockJobs} handle={() => {}} />);

        expect(screen.getByText("Software Engineer")).toBeInTheDocument();
        expect(screen.getByText("Tech Company")).toBeInTheDocument();
        expect(screen.getByText("Product Manager")).toBeInTheDocument();
        expect(screen.getByText("Business Corp")).toBeInTheDocument();
    });

    it("renders a loading message when there are no jobs", () => {
        render(<JobCardList jobs={[]} handle={() => {}} />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
});
