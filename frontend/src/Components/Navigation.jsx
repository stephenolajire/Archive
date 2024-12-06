// File: Navigation.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Css/Navigation.module.css';
import { House, BookOpen, InfoIcon, Contact, Menu, X } from "lucide-react";
import logo from '../assets/logo.jpg'

const Navigation = () => {

  const [menu, setMenu] = useState(true)

  const toggleMenu = () => {
    setMenu(!menu)
  }

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
      </ul>
      <div className={styles.optionCont}>
        {menu ? (
          <Menu size={32} className={styles.menu} onClick={toggleMenu} />
        ) : (
          <X size={32} className={styles.close} onClick={toggleMenu} />
        )}
      </div>
    </nav>
  );
};

export default Navigation;

