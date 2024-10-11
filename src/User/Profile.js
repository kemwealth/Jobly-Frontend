import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../Api/Api";
import UserContext from "./UserContext";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap"; // Added Alert for error display
import './Form.css';

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
    });

    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        if (currentUser) {
            setFormData({
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                username: currentUser.username,
            });
        }
    }, [currentUser]);

    console.debug(
        "ProfileForm",
        "currentUser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();

        const profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        };

        const username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
            setCurrentUser(updatedUser); // Update context with the new user info
            setFormErrors([]);
            navigate("/"); // Redirect after successful update
        } catch (errors) {
            setFormErrors(errors);
        }
    }

    /** Handle form data changing */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]); // Reset errors on input change
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <h1>Edit {formData.username}'s Profile</h1>
            </div>
            <div className="form-wrapper">
                <Form onSubmit={handleSubmit}>
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

                    {formErrors.length ? (
                        <Alert color="danger">
                            {formErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </Alert>
                    ) : null}

                    <Button
                        type="submit"
                        color="primary"
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Profile;
