import React from "react";
import img from "../assets/hero2.jpg";
import style from "../style/Card.module.css";

const Card = () => {
  return (
    <div className={style.container}>
      <img className={style.img} src={img} alt="author image" />
      <div className={style.textCont}>
        <p className={style.author}>olajire stephen</p>
        <h1 className={style.topic}>hostel management system</h1>
        <p className={style.department}>computer science</p>
      </div>
    </div>
  );
};

export default Card;
