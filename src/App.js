import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./Api/Api";
import NavBar from "./Nav/NavBar";
import Routes from "./Routes/Routes";
import UserContext from "./User/UserContext";
import jwt_decode from "jwt-decode"; // Use default import for clarity
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
          const { username } = jwt_decode(token);
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

    loadUserInfo();

    // Cleanup function
    return () => {
      setCurrentUser(null); // Optional: Clear current user on unmount
      setInfoLoaded(false); // Reset loading state
    };
  }, [token]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const signup = async (signupData) => {
    try {
      const newToken = await JoblyApi.signup(signupData);
      setToken(newToken);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  };

  const login = async (loginData) => {
    try {
      const newToken = await JoblyApi.login(loginData);
      setToken(newToken);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  };

  const jobApplied = (id) => jobApplyIds.has(id);

  const jobApply = (id) => {
    if (jobApplied(id)) return;
    JoblyApi.jobApply(currentUser.username, id);
    setJobApplyIds(new Set([...jobApplyIds, id]));
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
