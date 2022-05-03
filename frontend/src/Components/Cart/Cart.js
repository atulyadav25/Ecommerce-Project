import React from 'react';
import './Cart.css'
import CartItemCard from './CartItemCard';
import {useDispatch,useSelector} from 'react-redux'
  import {addItemsToCart,removeItemsFromCart} from '../../actions/cartAction' 
import { Typography } from '@mui/material';
import {Link,useNavigate } from 'react-router-dom'

const Cart = () => {

  const dispatch = useDispatch()
  const {cartItems} = useSelector((state)=> state.cart)
  const navigate = useNavigate();


  const increaseQuantity = (id,quantity,stock)=>{

    const newQty = quantity + 1
    if (stock <= quantity) {
          return;
    }

    dispatch(addItemsToCart(id,newQty))

  
  }

  const decreaseQuantity = (id,quantity)=>{

    const newQty = quantity - 1
    if (1 >= quantity) {
          return;
    }

    dispatch(addItemsToCart(id,newQty))

  }

  const deleteCartItems = (id)=>{
    dispatch(removeItemsFromCart(id))
  }


  const checkOutHandler = ()=>{
    navigate('/login?redirect=shipping')
  }

  return (
    <>
      {cartItems.length === 0? (
        <>
        <div className="emptyCart">
        <i className="fa-solid fa-cart-arrow-down"></i>
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
        </>
      ): (<>
      <div className="cartPage">


        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>


        {cartItems && cartItems.map((item)=>{
          return <div className="cartContainer" key={item.product}>
          <CartItemCard item={item} deleteCartItems={deleteCartItems} />
          <div className="cartInput">

            <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>

            <input type="Number" readOnly value={item.quantity} />
            
            <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
          </div>
          <p className='cartSubtotal'>{`₹${item.price * item.quantity}`}</p>
        </div>
        })}

        <div className="cartGrossProfit">

            <div></div>

            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>{`₹${cartItems.reduce(
                (acc,item)=> acc + item.quantity * item.price,0
              )}`}</p>
            </div>

            <div></div>

            <div className="checkOutBtn">
              <button onClick={checkOutHandler}>Check Out</button>
            </div>

        </div>
      </div>
    </>)}
    </>
  )
}

export default Cart