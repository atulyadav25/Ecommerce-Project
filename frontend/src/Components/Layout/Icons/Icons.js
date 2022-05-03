import React from 'react';
import './Icons.css';
import { Link } from 'react-router-dom';

const Icons = () => {
  return (
    <div className='Icons-div'>
      <div className='Icons-div2'>
        <Link to="/search">
          <i className="fa-solid fa-magnifying-glass i-kilas" ></i>
        </Link>
        <Link to="/cart">
          <i className="fa-solid fa-cart-shopping i-kilas" ></i>
        </Link>
        <Link to="/login">
        <i className="fa-solid fa-user i-kilas"></i>
        </Link>
      </div>
    </div>
  )
}

export default Icons