import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap"; // Added Alert for error display
import './Form.css';

const LoginForm = ({ login }) => {
    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: "",
        password: "",
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
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
                <h1>Login</h1>
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

                    {formErrors.length ? (
                        <Alert color="danger">
                            {formErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </Alert>
                    ) : null}

                    <Button type="submit" color="primary">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginForm;
