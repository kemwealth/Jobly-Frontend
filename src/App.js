import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./Api/Api";
import NavBar from "./Nav/NavBar";
import Routes from "./Routes/Routes";
import UserContext from "./User/UserContext";
import { decode as jwt_decode } from "jwt-decode"; // Use named export for jwt-decode
import useLocalStorage from "./Hooks/UseLocalStorage";
import './App.css';

export const TOKEN_STORAGE_ID = "jobly-token";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [jobApplyIds, setJobApplyIds] = useState(new Set([]));

  console.debug("App", { infoLoaded, currentUser, token });

  useEffect(() => {
    const loadUserInfo = async () => {
      console.debug("App useEffect loadUserInfo", "token=", token);

      if (token) {
        try {
          const { username } = jwt_decode(token); // Decode the token to get username
          JoblyApi.token = token; // Set token on the API class
          const currentUserData = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUserData);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    };

    setInfoLoaded(false); // Reset loading state
    loadUserInfo();
  }, [token]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null); // Clear token on logout
  };

  const signup = async (signupData) => {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token); // Store token in local storage
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  };

  const login = async (loginData) => {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token); // Store token in local storage
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  };

  const jobApplied = (id) => jobApplyIds.has(id); // Check if job was applied

  const jobApply = (id) => {
    if (jobApplied(id)) return; // Prevent double applications
    JoblyApi.jobApply(currentUser.username, id);
    setJobApplyIds(new Set([...jobApplyIds, id])); // Update applied jobs
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, jobApplied, jobApply }}>
        <div className="App">
          <NavBar logout={logout} />
          <Routes signup={signup} login={login} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
