import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";

export default function AppRouter() {
    return(
        <Router>
            <Routes>
                <Route path="users/login" element={<LoginPage />} />
                <Route path="users/forgot-password" element={<ForgotPassword />} />
                <Route path="users/reset-password" element={<ResetPassword />} />
                <Route path="users/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}