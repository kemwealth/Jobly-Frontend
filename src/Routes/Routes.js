import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/Home";
import PrivateRoute from "./PrivateRoutes";
import Companies from "../companies/CompaniesList";
import Company from "../companies/Company";
import Jobs from "../jobs/JobList";
import SignupForm from "../user/SignupForm";
import LoginForm from "../user/LoginForm";
import Profile from "../user/Profile";

const Routes = ({ signup, login }) => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <PrivateRoute exact path="/companies">
                    <Companies />
                </PrivateRoute>
                <PrivateRoute exact path="/companies/:handle">
                    <Company />
                </PrivateRoute>
                <PrivateRoute exact path="/jobs">
                    <Jobs />
                </PrivateRoute>
                <Route exact path="/login">
                    <LoginForm login={login}/>
                </Route>
                <Route exact path="/signup">
                    <SignupForm signup={signup}/>
                </Route>
                <PrivateRoute path="/profile">
                    <Profile />
                </PrivateRoute>

                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default Routes;