import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Products from "./pages/Products";
import Members from "./pages/Members";
import Suport from "./pages/Support";
import Messages from "./pages/Messages";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import Dashboard from "./components/Dashboard";
import UpdateProfile from "./components/UpdateProfile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import EmailVerified from "./pages/EmailVerified";

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const handleBodyClick = (event) => {
      dispatch({
        type: actionType.CHANGE_SIDEBAR,
        value: false,
      });
    };

    const temp = setTimeout(() => {
      if (state.sidebar) {
        document.addEventListener("click", handleBodyClick);
      } else {
        document.removeEventListener("click", handleBodyClick);
      }
    }, 1000);

    return () => {
      document.removeEventListener("click", handleBodyClick);
      clearTimeout(temp);
    };
  }, [state.sidebar]);

  if (state.currentUser && !state.currentUser.emailVerified) {
    return (
      <>
        {state.currentUser && <Navbar />}
        <Routes>
          <Route path="*" element={<EmailVerified />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      {state.currentUser && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={state.currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/reports"
          element={state.currentUser ? <Reports /> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={state.currentUser ? <Products /> : <Navigate to="/login" />}
        />
        <Route
          path="/members"
          element={state.currentUser ? <Members /> : <Navigate to="/login" />}
        />
        <Route
          path="/support"
          element={state.currentUser ? <Suport /> : <Navigate to="/login" />}
        />
        <Route
          path="/messages"
          element={state.currentUser ? <Messages /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={state.currentUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/update-profile"
          element={
            state.currentUser ? <UpdateProfile /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/signup"
          element={!state.currentUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!state.currentUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/forgot-password"
          element={
            !state.currentUser ? <ForgotPassword /> : <Navigate to="/" />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
