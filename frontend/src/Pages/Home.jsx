import React from "react";
import Hero from "../component/Hero";
import style from "../style/Home.module.css";
import Card from "../component/Card";
import About from "../component/About";
import Contact from "../component/Contact";
import { Link } from "react-router-dom";

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
        <div className={style.latest}>
          <h1 className={style.uploaded}>Our Vision</h1>
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
            <Link to="/journals">
              <div className={style.buttonDiv}>
                <button className={style.viewMoreButton}>
                  See More Journals
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <About />
      </section>
      <section>
        <Contact />
      </section>
    </main>
  );
};

export default Home;
