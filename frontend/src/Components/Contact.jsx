import React from 'react'
import Form from './Form'
import Social from './Social'
import style from '../css/Home.module.css'

const Contact = () => {
  return (
    <div className={style.contactCont}>
      <div className={style.contContact}>
        <h1 className={style.contact}>Contact Us</h1>
      </div>
      <div className={style.contactGrid}>
        <Social />
        <Form />
      </div>
    </div>
  );
}

export default Contact
