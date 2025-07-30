"use client";
import { useState } from "react";
import Layout from "../components/Layout";

// Main component to handle login and registration functionality
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle changes to any input field
  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if(error) setError("");
  };
  
  // Function to validate form data before submission
  const validateForm = () => {
    const {email, password, confirmPassword, firstName, lastName, phoneNumber} = formData;

    // Checks if email is of the format anything@anything.anything
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegEx.test(email)){
      setError("Please enter a valid email address");
      return false;
    }

    // Password length validation, makes sure it is at least 8 characters long
    if(password.length < 8){
      setError("Password must be at least 8 characters long");
      return false;
    }

    // Checks password format:
    // ?=.*[a-z] = must contain lowercase letter
    // ?=.*[A-Z] = must contain uppercase letter
    // ?=.*\d = must contain at least one digit
    if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)){
      setError("Password must contain at least one lowercase letter, one uppercase letter, and one number");
      return false;
    }

    // Registration validation, only when not in regular login mode
    if(!isLogin){
      // First, check that password matches confirmPassword during registration
      if(password !== confirmPassword){
        setError("Passwords do not match");
        return false;
      }

      // Now, check that the user entered valid name information (not just whitespace)
      if(!firstName.trim() || !lastName.trim()){
        setError("First name and last name are required");
        return false;
      }

      // Check phone number entry
      // RegEx allows optional + digits, spaces, dashes, or parentheses
      // Makes sure it is 10 characters long
      const phoneRegEx = /^\+?[\d\s\-\(\)]{10,}$/
      if(phoneNumber && !phoneRegEx.test(phoneNumber)){
        setError("Please enter a valid phone number");
        return false;
      }
    }

    // All form fields were entered correctly
    return true;
  }

  // Function handles form submission, both login and registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if(!validateForm()){
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          action: isLogin ? "login" : "register",
          ...formData
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        window.location.href = "/";
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setError("An error occurred while processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle between login and registration modes
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-full">
        <div className="login-container">
          <h2 className="login-title">
            {isLogin ? "Login" : "Create Account"}
          </h2>
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="login-input"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="login-input"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number (optional)"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="login-input"
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="login-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="login-input"
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="login-input"
              />
            )}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Login" : "Create Account"}
            </button>
            {error && <div className="login-error">{error}</div>}
          </form>
          <div style ={{ textAlign: "center", marginTop: "20px" }}>
            <button 
              type="button"
              onClick={toggleMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#991b1b',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {isLogin ? "Create an account" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
