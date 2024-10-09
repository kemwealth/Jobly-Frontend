import React, { useContext } from "react";
import UserContext from "../User/UserContext";
import { Link } from "react-router-dom";
import "./Home.css"

const Home = () => {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);
    
    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Find and apply for the best Jobs with JOBLY.</h1>
                <p className="lead">Discover new opportunities and apply privately using our applications.
                    Review compensation packages ahead including varities of packages.
                </p>
                {currentUser
                    ? <h2>
                        Welcome Back, {currentUser.firstName || currentUser.username}!
                    </h2>
                    : (
                        <div>
                            <Link className="auth-btn btn btn-primary font-weight-bold mr-3" to="/login">
                                Login
                            </Link>
                            <Link className="btn btn-primary font-weight-bold" to="/signup">
                                Sign up
                            </Link>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Home;