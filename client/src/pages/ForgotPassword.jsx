import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Logo from "../assets/logo.png";
import Background from "../assets/bg.jpg";

export default function ForgotPassword(){
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post("/users/forgot-password", {email});
            setMessage(response.data.message);
            navigate("/users/reset-password");
        }catch(error){
            setMessage("Error: Unable to process request. ",error);
        }
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "'Roboto', sans-serif",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Card Container */}
        <div
          style={{
            width: "90%",
            maxWidth: "400px",
            padding: "20px",
            borderRadius: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <img
            src={Logo}
            alt="Logo"
            style={{ marginBottom: "10px", borderRadius: "5%" }}
          />
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Forgot Password
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "95%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            />
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
              Proceed
            </button>
          </form>

          {/* Message */}
          {message && (
            <p
              style={{
                marginTop: "20px",
                fontSize: "14px",
                color: message.startsWith("Error") ? "red" : "green",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    );
}