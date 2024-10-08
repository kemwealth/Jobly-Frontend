import React from "react";
import JobCard from "./JobCard";

const JobCardList = ({ jobs, handle }) => {
    return (
        <div>
            <div>
                {jobs.length
                    ? (
                        <div className="CompanyList-list">
                            {jobs.map(j => (
                                <JobCard
                                key={j.id}
                                id={j.id}
                                title={j.title}
                                salary={j.salary}
                                equity={j.equity}
                                companyName={j.companyName}
                                handle={handle}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="lead">Loading...</p>
                    )}
            </div>
        </div>
    );
}

export default JobCardList;