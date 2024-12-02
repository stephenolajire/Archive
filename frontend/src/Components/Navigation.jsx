// File: Navigation.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Css/Navigation.module.css';
import { House, BookOpen, InfoIcon, Contact } from "lucide-react";
import logo from '../assets/logo.jpg'

const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      <img src={logo} className={styles.logo} />
      <input className={styles.search} type='search' placeholder='search for journals/books'/>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            <div className={styles.wrapper}>
              <House size={24} className={styles.icon} />
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
          >
            <div className={styles.wrapper}>
              <BookOpen size={24} className={styles.icon} />
              <p className={styles.linkText}>Journal</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            <div className={styles.wrapper}>
              <InfoIcon size={24} className={styles.icon} />
              <p className={styles.linkText}>About</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            <div className={styles.wrapper}>
              <Contact size={24} className={styles.icon} />
              <p className={styles.linkText}>Contact Us</p>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

