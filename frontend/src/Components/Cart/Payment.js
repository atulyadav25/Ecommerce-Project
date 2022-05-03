import React,{useRef, useEffect} from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useSelector,useDispatch } from 'react-redux';
import MetaData from '../Layout/MetaData';
import {useAlert} from 'react-alert';
import { Typography } from '@mui/material';

import {
    CardCvcElement,
    CardNumberElement,
    CardExpiryElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'

import axios from 'axios';
import './payment.css'
import {useNavigate} from 'react-router-dom'
import { createOrder,clearErrors } from '../../actions/orderAction';


const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const payBtn = useRef(null)
    const alert = useAlert()
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);


  const paymentData = {
    amount: Math.round(orderInfo.totalPrice *100)
  }

  const order ={
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice
  }

    const submitHandler = async(e)=>{
      e.preventDefault();
      payBtn.current.disabled = true;

      try {

        const config = {
          headers:{
            "Content-Type": "application/json",

          }
        }

        const {data} = await axios.post("/api/v1/payment/process",paymentData,config)

        const client_secret = data.client_secret;

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
              },
            },
          },
        });

        if (result.error) {
          payBtn.current.disabled = false;
  
          alert.error(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };
  
            dispatch(createOrder(order));
  
            navigate("/success");
          } else {
            alert.error("There's some issue while processing payment ");
          }
        }


        
      } catch (error) {
        payBtn.current.disabled = false;
        alert.error(error.response.data.message)
      }
    }


    useEffect(() => {
      if (error) {
        alert.error(error)
        dispatch(clearErrors())
      }
    }, [error,alert,dispatch])
    


  return (
    <>
        <MetaData title="Payment" />
      <CheckOutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
          <i className="fa-solid fa-credit-card i-login"></i>
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
          <i className="fa-solid fa-calendar-days i-login"></i>
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
          <i className="fa-solid fa-key i-login"></i>
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  )
}

export default Payment