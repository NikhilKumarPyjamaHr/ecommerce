import "./App.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserLogin } from "./User/UserLogin";
import { AdminLogin } from "./Admin/AdminLogin";
import UserDashboard from "./User/UserDashboard";
import Header from "./Common/Header";
import { getAuth, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import {
  addSigninAdmin,
  addSigninUser,
  addToken,
  addTokenAdmin,
} from "./Store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminHeader from "./Common/AdminHeader";

function App() {
  const access_token = useSelector((state) => state.auth.access_token);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkFirebaseToken(user);
        if (
          window.location.pathname == "/" ||
          window.location.pathname == "/userdashboard"
        ) {
          dispatch(addSigninUser(user.email));
        } else {
          dispatch(addSigninAdmin(user.email));
        }
      } else {
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const checkFirebaseToken = async (user) => {
    try {
      const tokenResult = await getIdTokenResult(user);

      if (tokenResult) {
        if (
          window.location.pathname == "/" ||
          window.location.pathname == "/userdashboard"
        ) {
          dispatch(addToken(tokenResult?.token));
        } else {
          dispatch(addTokenAdmin(tokenResult?.token));
        }
      }
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<UserLogin />} />
          <Route exact path="/admin" element={<AdminLogin />} />

          <Route exact path="/userdashboard" element={<UserDashboard />} />
          <Route exact path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
