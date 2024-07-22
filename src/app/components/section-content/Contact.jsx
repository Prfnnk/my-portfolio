import React from 'react';

const Contact = () => {
  return (
    <div className="contact">
      <h2 className="section__subtitle">Contacts</h2>
      <div className="contact__links">
        <a className="contact__item" href="mailto:someone@example.com">
          <span className="contact__item-inner">
            <span>E-mail</span>
            <span>email@gmail.com</span>
          </span>
        </a>
        <a className="contact__item" href="linkedin.com" target="_blank">
          <span className="contact__item-inner">
            <span>LinkedIn</span>
            <span>LinkedIn.com</span>
          </span>
        </a>
        <a className="contact__item" href="github.com" target="_blank">
          <span className="contact__item-inner">
            <span>Github</span>
            <span>Github.com</span>
          </span>
        </a>
      </div>
      <footer className="contact__footer">
        <p className="contact__footer-portfolio">Portfolio 2024</p>
        <p className="contact__footer-name">Designed and developed by me</p>
      </footer>
    </div>
  );
};

export default Contact;
