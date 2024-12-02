// File: Footer.jsx
import React from "react";
import styles from "../Css/Footer.module.css";
import { Twitter, Facebook, Linkedin} from "lucide-react";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>© 2024 Archive. All rights reserved.</p>
      <ul className={styles.socialLinks}>
        <li>
          <a href="#" className={styles.iconLink}>
            <Facebook size={20} />
          </a>
        </li>
        <li>
          <a href="#" className={styles.iconLink}>
            <Twitter size={20} />
          </a>
        </li>
        <li>
          <a href="#" className={styles.iconLink}>
            <Linkedin size={20} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

