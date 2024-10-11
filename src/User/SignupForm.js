import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Alert, Spinner } from "reactstrap"; // Import Spinner
import './Form.css';

const SignupForm = ({ signup }) => {
    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        setIsLoading(true); // Set loading state to true
        setFormErrors([]); // Clear previous errors

        let result = await signup(formData);
        setIsLoading(false); // Reset loading state after submission

        if (result.success) {
            navigate("/companies"); // Navigate to companies on success
        } else {
            setFormErrors(result.errors); // Set form errors on failure
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <h1>Signup</h1>
            </div>
            <div className="form-wrapper">
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="form-group">
                        <Label for="username">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="firstName">First Name</Label>
                        <Input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="lastName">Last Name</Label>
                        <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    {formErrors.length > 0 && (
                        <Alert color="danger">
                            {formErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </Alert>
                    )}

                    <Button type="submit" color="primary" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Spinner size="sm" color="light" /> Loading...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default SignupForm;
