import React, { useState } from "react";
import { CardBody, Form, FormGroup, Input, Button } from "reactstrap";

const SearchForm = ({ searchFor }) => {
    const [searchTerm, setSearchTerm] = useState("");

    /** Tell parent to filter */
    function handleSubmit(evt) {
        evt.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    /** Update form fields */
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="d-flex">
                            <Input
                                type="text"
                                name="searchTerm"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleChange}
                                className="flex-grow-1 mr-2"
                            />
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </div>
        </div>
    );
};

export default SearchForm;