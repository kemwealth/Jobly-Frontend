import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import './Form.css';

const LoginForm = ({ login }) => {
    const history = useHistory();
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
            history.push("/companies")
        } else {
            setFormErrors(result.errors);
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
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        color="primary"
                        onSubmit={handleSubmit}
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginForm;