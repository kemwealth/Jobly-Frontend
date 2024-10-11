import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JoblyApi from "../Api/Api";
import JobCardList from "../Jobs/JobCardList";

function Company() {
  const { handle } = useParams();
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const [company, setCompany] = useState(null); // Initial state set to null for clarity
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const companyData = await JoblyApi.getCompany(handle);
        const jobsData = await JoblyApi.getJobs();

        if (!companyData) {
          // If no company data, navigate back to the homepage or a not found page
          navigate("/"); // Redirect to home (or you can use a specific not found route)
          return; // Prevent further execution
        }

        setCompany(companyData);
        setJobs(jobsData.filter(job => job.companyHandle === handle));
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally navigate to an error page or show an alert
      } finally {
        setIsLoading(false); // Set loading to false after data fetching
      }
    }

    fetchData();
  }, [handle, navigate]); // Add navigate to dependency array

  // Display loading message while data is being fetched
  if (isLoading) {
    return <p className="lead">Loading...</p>;
  }

  // Handle case where company is not found
  if (!company) {
    return <p className="lead">Company not found.</p>;
  }

  return (
    <div className="col-md-8 offset-md-2">
      <h1>{company.name}</h1>
      <p className="row justify-content-center">{company.description}</p>
      {jobs.length > 0 ? <JobCardList jobs={jobs} /> : <p>No jobs available for this company.</p>}
    </div>
  );
}

export default Company;
