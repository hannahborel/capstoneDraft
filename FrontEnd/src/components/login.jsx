import React, { useState } from "react";
import { useLoginMutation } from "../api/API";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, setError } from "../redux/authSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginMutation, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log(email, password);
    try {
      const result = await loginMutation({ email, password }).unwrap();
      console.log(result);
      if (result.token) {
        // Dispatch setCredentials action to Redux
        dispatch(
          setCredentials({
            token: result.token,
            user: result.user,
          })
        );

        // Navigate to products page
        navigate("/products");
      } else {
        dispatch(setError("Login failed: No token received"));
      }
    } catch (err) {
      console.error("Login error:", err);
      dispatch(
        setError(
          err.data?.message ||
            "Failed to login. Please check your credentials and try again."
        )
      );
    }
  };

  if (isLoading) {
    return (
      <section className="login-container">
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <section className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </section>
  );
};

export default Login;
