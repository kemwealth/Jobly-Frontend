import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import JoblyApi from "../api/api";
import UserContext from "./UserContext";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import './Form.css';

const Profile = () => {
    const history = useHistory();
    const { currentUser, setCurrentUser } = useContext(UserContext);
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
    
      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
      });
    const [formErrors, setFormErrors] = useState([]);

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

        setFormData(f => ({ ...f, password: "" }));
        setFormErrors([]);

        // trigger reloading of user information throughout the site
        setCurrentUser(updatedUser);
        history.push("/");
    }

    /** Handle form data changing */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
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
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="firstName">First Name</Label>
                        <Input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="lastName">Last Name</Label>
                        <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
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

export default Profile;