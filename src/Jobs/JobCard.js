import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import UserContext from "../user/UserContext";
import "./JobCard.css";

const JobCard = ({ id, title, salary, equity, companyName }) => {
    const { jobApplied, jobApply } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function changeAppliedStatus() {
        setApplied(jobApplied(id));
    }, [id, jobApplied]);

    async function handleApply(evt) {
        if (jobApplied(id)) return;
        jobApply(id);
        setApplied(true);
    }

    return (
        <section className="cards">
            <Card className="JobCard card"> {applied}
                <CardBody className="card-body">
                    <CardTitle className="font-weight-bold text-center">
                        <h5 className="card-title">
                            {title}
                        </h5>
                    </CardTitle>
                    <CardText >
                    <p>{companyName}</p>
                        {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
                        {equity !== null ? (
                            <div><small>Equity: {equity}</small></div>
                        ) : (
                            <div><small>Equity: 0</small></div>
                        )}
                    </CardText>
                    <Button
                        onClick={handleApply}
                        disabled={applied}
                    >
                        {applied ? "Applied" : "Apply"}    
                    </Button>
                </CardBody>
            </Card>
        </section>
    )
}

function formatSalary(salary) {
    const digitsRev = [];
    const salaryStr = salary.toString();

    for (let i = salaryStr.length - 1; i >= 0; i--) {
        digitsRev.push(salaryStr[i]);
        if (i > 0 && i % 3 === 0) digitsRev.push(",");
    }

    return digitsRev.reverse().join("");
}

export default JobCard;