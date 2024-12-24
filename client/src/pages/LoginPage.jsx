/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import {useAuth} from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import BookSide from "../assets/bookSide.jpg";
import Background from "../assets/registerbg.jpg";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await login({email, password});
            navigate("/dashboard");
        }catch(error){
            console.error("Login failed", error);
        }
    };

    const handleForgotPassword = () => {
      // Here you can navigate to a "Forgot Password" page or handle it inline
      alert("Redirecting to forgot password page...");
      navigate("/users/forgot-password");
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundColor: "white",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {/* Card Container */}
        <div
          style={{
            display: "flex",
            width: "90%",
            maxWidth: "800px",
            borderRadius: "15px",
            overflow: "hidden",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Left Section with Image */}
          <div
            style={{
              flex: 1,
              backgroundImage: `url(${BookSide})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Right Section with Login Form */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}
            >
              <img src={Logo} alt="Logo" style={{ marginBottom: "20px" }} />
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Welcome Back !!
              </h1>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#4A4A4A",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
              </form>
              <button
                onClick={handleForgotPassword}
                style={{
                  marginTop: "15px",
                  background: "none",
                  border: "none",
                  color: "#4A4A4A",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "14px",
                }}
              >
                Forgot password?
              </button>
              <p style={{ marginTop: "20px", fontSize: "14px", color: "#777" }}>
                Don't have an account?{" "}
                <a
                  href="users/register"
                  style={{ color: "#4A4A4A", textDecoration: "underline" }}
                >
                  Register here
                </a>
              </p>
              <p style={{ marginTop: "15px", fontSize: "12px", color: "#aaa" }}>
                Terms of use. Privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}