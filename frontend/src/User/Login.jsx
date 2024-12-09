import React, { useState } from "react";
import style from "../css/Login.module.css";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className={style.container} >
      <div className={style.formContainer}>
        <form className={style.form}>
          <div className={style.plogodiv}>
            <img className={style.plogo} src={logo} alt="logo" />
          </div>
          <h3 className={style.welcome}>
            Welcome Back to <span className={style.lycen}>Archive</span>
          </h3>
          <p className={style.detail}>
            Please provide your login details correctly
          </p>

          {error && <p className={style.error}>{error}</p>}

          <div className={style.formDiv}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Please enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={style.formDiv}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Please enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/verifyemail">
            <p className={style.forgot}>Forgot Password?</p>
          </Link>
          <div>
            <button
              className={style.login}
              disabled={!email || !password || loading}
            >
              {loading ? "Loading ..." : "Login"}
            </button>
          </div>
          <div>
            <p className={style.signupText}>
              Don't have an account yet? Please click{" "}
              <Link to="/signup">
                <span className={style.link}>here</span>
              </Link>{" "}
              to signup
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
