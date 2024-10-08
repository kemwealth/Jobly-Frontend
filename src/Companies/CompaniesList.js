import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import SearchForm from "../search/SearchForm";
import CompanyCard from "./CompanyCard";
import "./CompanyCard.css";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCompanies() {
      setLoading(true);
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      setLoading(false);
    }
    getCompanies();
  }, []);

  async function search(name) {
    setLoading(true);
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
    setLoading(false);
  }

  // Check if there are no companies
  const noResultsFound = companies.length === 0;

  return (
    <div className="col-md-8 offset-md-2">
      <h1>Search Companies</h1>
      <SearchForm searchFor={search} />
      <div>
        {loading ? (
          <p className="lead">Loading...</p>
        ) : noResultsFound ? (
          <p className="lead">No results found!</p>
        ) : (
          <div className="CompanyList-list">
            {companies.map(c => (
              <CompanyCard
                key={c.handle}
                handle={c.handle}
                name={c.name}
                description={c.description}
                logoUrl={c.logoUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
