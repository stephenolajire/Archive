// File: Navigation.jsx
import React, { useContext, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import styles from "../style/Navigation.module.css";
import { House, BookOpen, Plus, Contact, Menu, X } from "lucide-react";
import logo from "../assets/logo.jpg";
import { GlobalContext } from "../GlobalContext/GlobalContext";

const Navigation = () => {
  const { isAuthenticated, checkAuth, setIsModalOpen, isModalOpen } =
    useContext(GlobalContext);
  const [menu, setMenu] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
    checkAuth();
  };

  const openModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  return (
    <nav className={styles.navbar}>
      <img src={logo} className={styles.logo} />
      <input
        className={styles.search}
        type="search"
        placeholder="search for journals/books"
      />
      <ul
        className={`${styles.navLinks} ${menu ? styles.closes : styles.open}`}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={toggleMenu}
          >
            <div className={styles.wrapper}>
              <House size={20} className={styles.icon} />
              <p className={styles.linkText}>Home</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/journals"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={toggleMenu}
          >
            <div className={styles.wrapper}>
              <BookOpen size={20} className={styles.icon} />
              <p className={styles.linkText}>Journal</p>
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={toggleMenu}
          >
            <div className={styles.wrapper}>
              <Contact size={20} className={styles.icon} />
              <p className={styles.linkText}>Contact Us</p>
            </div>
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li className={styles.logoutText} onClick={handleLogout}>
              Logout
            </li>
            <Link onClick={toggleMenu}>
              <li
                className={styles.upload}
                onClick={() => setIsModalOpen(true)}
              >
                Upload
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <li className={styles.loginText}>Login</li>
            </Link>
            <Link to="/signup">
              <li className={styles.signupText}>Signup</li>
            </Link>
          </>
        )}
      </ul>

      <div className={styles.optionCont}>
        {menu ? (
          <Menu size={32} className={styles.menu} onClick={toggleMenu} />
        ) : (
          <X size={32} className={styles.close} onClick={toggleMenu} />
        )}
      </div>
      {isAuthenticated ? (
        <div className={styles.divLogout}>
          <div>
            <div className={styles.uploadDiv} onClick={openModal}>
              <Plus className={styles.add} size={25} />
            </div>
          </div>
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className={styles.divAuth}>
          <Link to="/login">
            <button className={styles.login}>Login</button>
          </Link>
          <Link to="/signup">
            <button className={styles.signup}>Signup</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
