import React, { useState } from "react";
import style from "../css/Login.module.css";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <form className={style.form}>
          <div className={style.plogodiv}>
            <img className={style.plogo} src={logo} alt="logo" />
          </div>
          <h3 className={style.welcome}>
            Welcome to <span className={style.lycen}>Archive</span>
          </h3>
          <p className={style.detail}>
            Please provide your signup details correctly
          </p>

          {error && <p className={style.error}>{error}</p>}

          <div className={style.formDiv}>
            <label>FirstName</label>
            <input
              type="text"
              placeholder="Please enter your name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className={style.formDiv}>
            <label>LastName</label>
            <input
              type="text"
              placeholder="Please enter your surname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

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

          <div className={style.formDiv}>
            <label>ConfirmPassword</label>
            <input
              type="password"
              placeholder="Please enter your password again"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>
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
              <Link to="/login">
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

export default Signup;
