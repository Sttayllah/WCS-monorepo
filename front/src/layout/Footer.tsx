import React from 'react';
import { BsGoogle } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-logo-wrapper">
        <div className="footer-icon-google">
          <BsGoogle />
        </div>
        <div className="footer-icon-facebook">
          <FaFacebookF />
        </div>
        <div className="footer-icon-twitter">
          <FiTwitter />
        </div>
      </div>
      <div className="footer-btn-wrapper">
        <button className="footer-home">Home</button>
        <button className="footer-services">Services</button>
        <button className="footer-about">About</button>
        <button className="footer-terms">Terms</button>
        <button className="footer-privacy">Privacy Policy</button>
      </div>
      <div className="footer-company-wrapper">
        <p>YeahBuddy © 2022</p>
      </div>
    </footer>
  );
}

export default Footer;
