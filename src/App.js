// import React, { useState, useEffect } from "react";
// import { BrowserRouter } from "react-router-dom";
// import JoblyApi from "./Api/Api";
// import NavBar from "./Nav/NavBar";
// import Routes from "./Routes/Routes";
// import UserContext from "./User/UserContext";
// import jwt from 'jsonwebtoken' // Use default import for clarity
// import useLocalStorage from "./Hooks/UseLocalStorage";
// import './App.css';

// export const TOKEN_STORAGE_ID = "jobly-token";

// const App = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [infoLoaded, setInfoLoaded] = useState(false);
//   const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
//   const [jobApplyIds, setJobApplyIds] = useState(new Set([]));

//   console.debug("App", { infoLoaded, currentUser, token });

//   useEffect(() => {
//     const loadUserInfo = async () => {
//       console.debug("App useEffect loadUserInfo", "token=", token);

//       if (token) {
//         try {
//           const { username } = jwt.decode(token);
//           JoblyApi.token = token; // Set token on the API class
//           const currentUserData = await JoblyApi.getCurrentUser(username);
//           setCurrentUser(currentUserData);
//         } catch (err) {
//           console.error("App loadUserInfo: problem loading", err);
//           setCurrentUser(null);
//         }
//       }
//       setInfoLoaded(true);
//     };

//     loadUserInfo();

//     // Cleanup function
//     return () => {
//       setCurrentUser(null); // Optional: Clear current user on unmount
//       setInfoLoaded(false); // Reset loading state
//     };
//   }, [token]);

//   const logout = () => {
//     setCurrentUser(null);
//     setToken(null);
//   };

//   const signup = async (signupData) => {
//     try {
//       const newToken = await JoblyApi.signup(signupData);
//       setToken(newToken);
//       return { success: true };
//     } catch (errors) {
//       console.error("signup failed", errors);
//       return { success: false, errors };
//     }
//   };

//   const login = async (loginData) => {
//     try {
//       const newToken = await JoblyApi.login(loginData);
//       setToken(newToken);
//       return { success: true };
//     } catch (errors) {
//       console.error("login failed", errors);
//       return { success: false, errors };
//     }
//   };

//   const jobApplied = (id) => jobApplyIds.has(id);

//   const jobApply = (id) => {
//     if (jobApplied(id)) return;
//     JoblyApi.jobApply(currentUser.username, id);
//     setJobApplyIds(new Set([...jobApplyIds, id]));
//   };

//   return (
//     <BrowserRouter>
//       <UserContext.Provider value={{ currentUser, setCurrentUser, jobApplied, jobApply }}>
//         <div className="App">
//           <NavBar logout={logout} />
//           <Routes signup={signup} login={login} />
//         </div>
//       </UserContext.Provider>
//     </BrowserRouter>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./Api/Api";
import NavBar from "./Nav/NavBar";
import Routes from "./Routes/Routes";
import UserContext from "./User/UserContext";
import { jwtDecode } from "jwt-decode"; // Use named import instead of default
import useLocalStorage from "./Hooks/UseLocalStorage";
import './App.css';

export const TOKEN_STORAGE_ID = "jobly-token";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set([]));

  console.debug("App", { infoLoaded, currentUser, token });

  useEffect(() => {
    const loadUserInfo = async () => {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          JoblyApi.token = token; // Set the token globally for API calls
          const currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading user info", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    };

    setInfoLoaded(false);
    loadUserInfo();

    return () => setInfoLoaded(false); // Cleanup
  }, [token]);

  /** Handles user logout. */
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  /** Handles user signup and saves token on success. */
  const signup = async (signupData) => {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Signup failed", errors);
      return { success: false, errors };
    }
  };

  /** Handles user login and saves token on success. */
  const login = async (loginData) => {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Login failed", errors);
      return { success: false, errors };
    }
  };

  /** Checks if a job has been applied for by the current user. */
  const jobApplied = (id) => appliedJobIds.has(id);

  /** Handles job application by current user. */
  const jobApply = (id) => {
    if (jobApplied(id)) return;
    JoblyApi.jobApply(currentUser.username, id);
    setAppliedJobIds((prevIds) => new Set(prevIds).add(id)); // Update applied job IDs more efficiently
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

