import React from 'react';
import './OrderSuccess.css';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">

<i className="fa-solid fa-circle-check big-success"></i>
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess