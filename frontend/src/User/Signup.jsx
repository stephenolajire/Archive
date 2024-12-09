import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../css/Login.module.css";
import logo from "../assets/logo.jpg";
import api from "../Api/api";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordRegrex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegrex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!firstname || firstname.length < 2)
      newErrors.firstname = "Enter a valid first name";
    if (!lastname || lastname.length < 2)
      newErrors.lastname = "Enter a valid last name";
    if (!emailRegrex.test(email))
      newErrors.email = "Enter a valid email address";
    if (!passwordRegrex.test(password))
      newErrors.password =
        "Password must contain at least 8 characters, including a letter, a number, and a special character";
    if (password !== cpassword) newErrors.cpassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      first_name: firstname,
      last_name : lastname,
      password : password,
      email : email
    }

    setErrors({});
    setLoading(true);
    try {
      const response = await api.post("signup/", userData);
      if (response.status === 201) {
        navigate("/login");
      } else {
        setErrors({ global: "Something went wrong. Please try again." });
      }
    } catch (error) {
      setErrors({ global: "An error occurred. Please try again." });
      console.log(error)
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
            Welcome to <span className={style.lycen}>Archive</span>
          </h3>
          <p className={style.detail}>
            Please provide your signup details correctly
          </p>

          {errors.global && <p className={style.error}>{errors.global}</p>}

          <div className={style.formDiv}>
            <label>First Name</label>
            <input
              type="text"
              placeholder="Please enter your name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            {errors.firstname && (
              <p className={style.error}>{errors.firstname}</p>
            )}
          </div>

          <div className={style.formDiv}>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Please enter your surname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            {errors.lastname && (
              <p className={style.error}>{errors.lastname}</p>
            )}
          </div>

          <div className={style.formDiv}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Please enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={style.error}>{errors.email}</p>}
          </div>

          <div className={style.formDiv}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Please enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className={style.error}>{errors.password}</p>
            )}
          </div>

          <div className={style.formDiv}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Please enter your password again"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            {errors.cpassword && (
              <p className={style.error}>{errors.cpassword}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className={style.login}
              disabled={
                !email || !password || !firstname || !lastname || loading
              }
            >
              {loading ? "Loading ..." : "Sign Up"}
            </button>
          </div>
          <div>
            <p className={style.signupText}>
              Already have an account? Click{" "}
              <Link to="/login">
                <span className={style.link}>here</span>
              </Link>{" "}
              to login.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
