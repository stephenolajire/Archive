import React, { useContext, useState } from "react";
import style from "../style/Login.module.css";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/api";
import { GlobalContext } from "../GlobalContext/GlobalContext";

const Login = () => {

  const {checkAuth} = useContext (GlobalContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const passwordRegrex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegrex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {};
    if (!emailRegrex.test(email)) {
      newError.email = "Enter a valid email address.";
    }
    if (!passwordRegrex.test(password)) {
      newError.password =
        "Password must contain letters, numbers, and symbols.";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    setError({});
    setLoading(true);

    const userData = { email, password };

    try {
      const response = await api.post("token/", userData);
      if (response.status === 200) {
        const { access, refresh } = response.data;

        // Store tokens
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        navigate("/");
        checkAuth ();
      } else {
        setError({ global: "Something went wrong, please try again." });
      }
    } catch (error) {
      setError({ global: "An error occurred during login. Please try again." });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.plogodiv}>
            <img className={style.plogo} src={logo} alt="logo" />
          </div>
          <h3 className={style.welcome}>
            Welcome Back to <span className={style.lycen}>Archive</span>
          </h3>
          <p className={style.detail}>
            Please provide your login details correctly.
          </p>

          {error.global && <p className={style.error}>{error.global}</p>}

          <div className={style.formDiv}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Please enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <p className={style.error}>{error.email}</p>}
          </div>

          <div className={style.formDiv}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Please enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <p className={style.error}>{error.password}</p>}
          </div>

          <Link to="/verifyemail">
            <p className={style.forgot}>Forgot Password?</p>
          </Link>
          <div>
            <button
              className={style.login}
              type="submit"
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
              to signup.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
