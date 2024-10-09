import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Change Switch to Routes and Redirect to Navigate
import Home from "../Home/Home";
import PrivateRoute from "./PrivateRoutes";
import Companies from "../Companies/CompaniesList";
import Company from "../Companies/Company";
import Jobs from "../Jobs/JobList";
import SignupForm from "../User/SignupForm";
import LoginForm from "../User/LoginForm";
import Profile from "../User/Profile";

const AppRoutes = ({ signup, login }) => {
    return (
        <div>
            <Routes> {/* Use Routes instead of Switch */}
                <Route path="/" element={<Home />} /> {/* Use element prop */}
                <Route 
                    path="/companies" 
                    element={
                        <PrivateRoute>
                            <Companies />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/companies/:handle" 
                    element={
                        <PrivateRoute>
                            <Company />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/jobs" 
                    element={
                        <PrivateRoute>
                            <Jobs />
                        </PrivateRoute>
                    } 
                />
                <Route path="/login" element={<LoginForm login={login} />} /> {/* Use element prop */}
                <Route path="/signup" element={<SignupForm signup={signup} />} /> {/* Use element prop */}
                <Route 
                    path="/profile" 
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } 
                />

                <Route path="*" element={<Navigate to="/" />} /> {/* Use Navigate for redirecting */}
            </Routes>
        </div>
    );
}

export default AppRoutes;
