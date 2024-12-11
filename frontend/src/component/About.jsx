import React from "react";
import style from '../style/Home.module.css'
import aboutImg from "../assets/hero3.jpg";

const About = () => {
  return (
    <section id={style.about}>
      <div className={style.AboutCont}>
        <h1 className={style.aboutUs1}>About us</h1>
      </div>
      <div className={style.aboutCont}>
        <div className={style.imgCont}>
          <img
            className={style.aboutImage}
            src={aboutImg}
            alt="about section image"
          />
        </div>
        <div className={style.textCont}>
          <h1 className={style.aboutUs}>About us</h1>
          <p className={style.aboutText}>
            Welcome to Adeleke Journals, a vibrant platform dedicated to
            fostering knowledge sharing and empowering the next generation of
            learners. Our mission is to connect students, alumni, and educators
            through a rich repository of academic journals and articles. Founded
            with the vision to inspire and guide, our platform showcases the
            incredible work of past students from Adeleke University. <br />{" "}
            Each journal is a testament to their hard work, creativity, and
            commitment to academic excellence. But we’re more than just a
            collection of journals—we're a community. By joining us, you’re not
            just accessing valuable resources; you're becoming part of a growing
            network that thrives on collaboration and mutual growth. Whether
            you're here to discover groundbreaking ideas, share your knowledge,
            or learn from the experiences of others, we provide the perfect
            space to do so. <br /> We encourage you to contribute by uploading
            your own journals and insights to inspire others and contribute to
            the collective success of our community. Together, let’s shape the
            future of learning and create a legacy that will empower generations
            to come.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
