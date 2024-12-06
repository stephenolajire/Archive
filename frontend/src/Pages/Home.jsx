import React from "react";
import Hero from "../Components/Hero";
import style from "../Css/Home.module.css";
import Card from "../Components/Card";
import aboutImg from '../assets/hero3.jpg'

const Home = () => {
  return (
    <main>
      <section>
        <Hero />
      </section>
      <section>
        <div className={style.container}>
          {/* Discover Section */}
          <div>
            <h1 className={style.discover}>Discover, Share, and Learn</h1>
            <p className={style.description}>
              Explore journals and articles uploaded by past students of Adeleke
              University. Their work continues to inspire and guide the next
              generation of learners.
            </p>
          </div>
          {/* Featured Author Section */}
          <div>
            <h1 className={style.featured}>Featured Author</h1>
            <p className={style.authorDetails}>
              Meet one of Adeleke's past students, whose journal has made a
              significant impact. Discover their insights and be motivated to
              share your own work.
            </p>
          </div>
          {/* Join Our Community Section */}
          <div>
            <h1 className={style.community}>Join Our Community</h1>
            <p className={style.communityText}>
              Be a part of this growing community where knowledge is shared, and
              inspiration is cultivated. Upload your own journals and contribute
              to the success of fellow students.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h1 className={style.uploaded}>Latest Uploaded Journals</h1>
        </div>
        <div className={style.grid}>
          <div className={style.cardGrid}>
            <Card />
            <Card />
            <Card />
          </div>
          <div className={style.moreJournals}>
            <p>
              Discover more insightful journals and articles contributed by
              talented students and alumni. Explore a variety of topics and gain
              fresh perspectives.
            </p>
            <div className={style.buttonDiv}>
              <button className={style.viewMoreButton}>
                See More Journals
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id={style.about}>
        <h1 className={style.aboutUs1}>About us</h1>
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
              learners. Our mission is to connect students, alumni, and
              educators through a rich repository of academic journals and
              articles. Founded with the vision to inspire and guide, our
              platform showcases the incredible work of past students from
              Adeleke University. <br /> Each journal is a testament to their
              hard work, creativity, and commitment to academic excellence. But
              we’re more than just a collection of journals—we're a community.
              By joining us, you’re not just accessing valuable resources;
              you're becoming part of a growing network that thrives on
              collaboration and mutual growth. Whether you're here to discover
              groundbreaking ideas, share your knowledge, or learn from the
              experiences of others, we provide the perfect space to do so.{" "}
              <br /> We encourage you to contribute by uploading your own
              journals and insights to inspire others and contribute to the
              collective success of our community. Together, let’s shape the
              future of learning and create a legacy that will empower
              generations to come.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
