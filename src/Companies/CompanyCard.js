import React from "react";
import { CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ name, description, handle }) => {
    return (
        <div className="CompanyCard card"> {/* Changed section to div for better semantics */}
            <Link to={`/companies/${handle}`} className="card-link"> {/* Added card-link class for styling */}
                <CardBody className="card-body">
                    <CardTitle className="font-weight-bold text-center">
                        <h5 className="card-title">{name}</h5>
                    </CardTitle>
                    <CardText>
                        <p className="font-italic">{description}</p>
                    </CardText>
                </CardBody>
            </Link>
        </div>
    );
};

export default CompanyCard;
