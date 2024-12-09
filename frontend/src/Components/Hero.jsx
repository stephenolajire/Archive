import React from "react";
import Hero3 from "../assets/hero3.jpg";
import Hero2 from "../assets/hero2.jpg";
import style from "../Css/Hero.module.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div
        className={style.container}
        style={{
          backgroundImage: `url(${Hero2})`,
        }}
      >
        <div className={style.heroCont}>
          <div>
            <h1 className={style.heroHeader}>
              Students' Academic <br />
              Journal Archive <br />
              Platform
            </h1>

            <p className={style.text}>
              Welcome to Adeleke University Journals <br /> Archive platform
              where you can get access to tons <br /> of previous work by the
              students
            </p>
            <p className={style.text2}>
              Welcome to Adeleke University <br /> Journals Archive platform
            </p>
          </div>
          <Link to='/login'>
            <button className={style.btn}>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
