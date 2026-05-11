import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

function Register() {
  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ username, email, password });
    navigate("/login");
  };
  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>{" "}
      </main>
    );
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Username</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              id="name"
              name="name"
              required
              placeholder="enter the username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              required
              placeholder="enter the email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              required
              placeholder="enter the password"
            />
          </div>
          <button className="button primary-button">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
