import React from "react";
import "./About.css";
import {Typography } from "@material-ui/core";
import {Link} from 'react-router-dom'

const About = () => {
  
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Typography>Ecommerce Project</Typography>
            <button color="primary">
              Visit Instagram
            </button>
            <span>
              This is a sample wesbite made by Me.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <Link to="/"
              target="blank"
            >
              <i className="fa-brands fa-instagram"></i>
            </Link>

            <Link to="/" target="blank">
            <i className="fa-brands fa-youtube"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;