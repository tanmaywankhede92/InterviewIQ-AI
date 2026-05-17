import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });
    if (success) {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading your workspace...</h1>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-hero" aria-label="InterviewIQ introduction">
        <p className="auth-eyebrow">InterviewIQ</p>
        <h1>Practice with a plan that feels built for you.</h1>
        <p>
          Turn job descriptions, resumes, and experience notes into focused
          interview preparation without losing the human judgment.
        </p>
      </section>

      <div className="form-container">
        <div className="form-heading">
          <p className="auth-eyebrow">Welcome back</p>
          <h2>Sign in</h2>
          <p>Open your saved interview plans and keep preparing.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              autoComplete="email"
              required
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
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>
          <button className="button primary-button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
