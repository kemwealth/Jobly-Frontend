import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Updated import
import JoblyApi from "../Api/Api";
import UserContext from "./UserContext";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import './Form.css';

const Profile = () => {
    const navigate = useNavigate(); // Updated variable name
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

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errors) {
            debugger;
            setFormErrors(errors);
            return;
        }

        setFormData(f => ({ ...f, password: "" })); // Password reset if applicable
        setFormErrors([]);

        // Trigger reloading of user information throughout the site
        setCurrentUser(updatedUser);
        navigate("/"); // Updated to use navigate
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
                            required // Added required attribute
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="firstName">First Name</Label>
                        <Input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required // Added required attribute
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="lastName">Last Name</Label>
                        <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required // Added required attribute
                        />
                    </FormGroup>
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
