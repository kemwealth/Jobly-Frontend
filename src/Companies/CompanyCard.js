import React from "react";
import { CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ name, description, handle }) => {
    return (
        <section className="cards">
            <Link className="CompanyCard card" to={`/companies/${handle}`}>
                <CardBody className="card-body">
                    <CardTitle className="font-weight-bold text-center">
                        <h5 className="card-title">
                            {name}
                        </h5>
                    </CardTitle>
                    <CardText >
                        <p className="font-italic">{description}</p>
                    </CardText>
                </CardBody>
            </Link>
        </section>
    )
}

export default CompanyCard;