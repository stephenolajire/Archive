import React from "react";
import Hero3 from "../assets/hero3.jpg";
import Hero2 from "../assets/hero2.jpg";
import style from "../Css/Hero.module.css";

const Hero = () => {
  return (
    <div>
      <div className={style.conatiner}
        style={{
            backgroundImage: `url(${Hero2})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "60rem",
            objectFit: "fill",
            backgroundPosition: "center"
        }}
      >
        <div>
            <h1>
                Student Acc
            </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
