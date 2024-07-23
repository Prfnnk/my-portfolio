import React from 'react';

const Contact = () => {
  const copyEmail = (e) => {
    console.log(e);
    const email = e.target.dataset.email;
    const span = e.target.querySelector('[data-email-span]');
    navigator.clipboard.writeText(email);
    span.innerHTML = 'Done!';
    setTimeout(() => {
      span.innerHTML = 'Copy';
    }, 2000);
  };
  return (
    <div className="contact">
      <h2 className="section__subtitle">Contacts</h2>
      <div className="contact__links">
        <a
          className="contact__item"
          href="https://www.linkedin.com/in/abdurakhmanova-maria/"
          target="_blank"
        >
          <span className="contact__item-inner">
            <span>LinkedIn</span>
            <span>Visit profile</span>
          </span>
        </a>
        <p
          className="contact__item contact__item--email"
          onClick={(event) => {
            copyEmail(event);
          }}
          data-email="abdurakhmanovamaria@gmail.com"
        >
          <span className="contact__item-inner">
            <span>E-mail</span>
            <span data-email-span>Copy</span>
          </span>
        </p>
        <a
          className="contact__item"
          href="https://github.com/Prfnnk"
          target="_blank"
        >
          <span className="contact__item-inner">
            <span>Github</span>
            <span>Visit profile</span>
          </span>
        </a>
      </div>
      <footer className="contact__footer">
        <p className="contact__footer-portfolio">Portfolio 2024</p>
        <p className="contact__footer-name">Designed and developed by me 💅🏻</p>
      </footer>
    </div>
  );
};

export default Contact;
