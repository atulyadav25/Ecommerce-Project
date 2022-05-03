import React from "react";
import "./Contact.css";
import {Link} from 'react-router-dom'


const Contact = () => {
  return (
    <div className="contactContainer">
      <Link to="/" className="mailBtn">
        <button>Contact: Thug Bhaiya</button>
      </Link>
    </div>
  );
};

export default Contact;