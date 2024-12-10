import React from "react";
import styles from "../css/Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Platform Info */}
        <div className={styles.column}>
          <h3 className={styles.title}>Student Journal Archive</h3>
          <p className={styles.text}>
            Discover and access a wide range of academic journals curated for
            students. Empowering learning and research.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.column}>
          <h4 className={styles.subtitle}>Quick Links</h4>
          <ul className={styles.list}>
            <li>
              <a href="/about" className={styles.link}>
                About Us
              </a>
            </li>
            <li>
              <a href="/journals" className={styles.link}>
                Browse Journals
              </a>
            </li>
            <li>
              <a href="/contact" className={styles.link}>
                Contact
              </a>
            </li>
            <li>
              <a href="/help" className={styles.link}>
                Help
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className={styles.column}>
          <h4 className={styles.subtitle}>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a
              href="https://facebook.com"
              className={styles.icon}
              aria-label="Facebook"
            >
              🌐
            </a>
            <a
              href="https://twitter.com"
              className={styles.icon}
              aria-label="Twitter"
            >
              🌐
            </a>
            <a
              href="https://instagram.com"
              className={styles.icon}
              aria-label="Instagram"
            >
              🌐
            </a>
            <a
              href="https://linkedin.com"
              className={styles.icon}
              aria-label="LinkedIn"
            >
              🌐
            </a>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p className={styles.text}>
          &copy; {new Date().getFullYear()} Student Journal Archive. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
