import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";

function Company() {
  const { handle } = useParams();

  const [company, setCompany] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const companyData = await JoblyApi.getCompany(handle);
        const jobsData = await JoblyApi.getJobs(); 
        setCompany(companyData);
        setJobs(jobsData.filter(job => job.companyHandle === handle)); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [handle]);

  if (!company.name) {
    return <p className="lead">Loading...</p>;
  }

  return (
    <div className="col-md-8 offset-md-2">
      <h1>{company.name}</h1>
      <p className="row justify-content-center">{company.description}</p>
      <JobCardList jobs={jobs} />
    </div>
  );
}

export default Company;