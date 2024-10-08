import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import SearchForm from "../search/SearchForm";
import JobCardList from "./JobCardList";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getJobs() {
      setLoading(true);
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
      setLoading(false);
    }
    getJobs();
  }, []);

  async function search(title) {
    setLoading(true);
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
    setLoading(false);
  }

  // Check if there are no jobs
  const noResultsFound = jobs.length === 0;

  return (
    <div className="col-md-8 offset-md-2">
      <h1>Search Jobs</h1>
      <SearchForm searchFor={search} />
      <div>
        {loading ? (
          <p className="lead">Loading...</p>
        ) : noResultsFound ? (
          <p className="lead">No results found!</p>
        ) : (
            <JobCardList jobs={jobs} />
        )}
      </div>
    </div>
  );
};

export default Jobs;