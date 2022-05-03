import React, { useState } from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Headers from './Components/Layout/Header/Header';
import Footer from './Components/Layout/Footer/Footer';
import Home from './Components/Home/Home';
import Contact from './Components/Layout/Contact/Contact'
import About from './Components/Layout/About/About'
import ProductDetails from './Components/Product/ProductDetails'
import Products from './Components/Product/Products';
import Search from './Components/Product/Search'
import Icons from "./Components/Layout/Icons/Icons";
import LoginSignup from "./Components/User/LoginSignup";
import store from './store';
import { loadUser } from "./actions/userAction";
import UserOptions from './Components/Layout/Header/UserOptions'
import { useSelector } from "react-redux";
import Profile from './Components/User/Profile';
import ProtectedRoute from './Components/Route/ProtectedRoute'
import UpdateProfile from './Components/User/UpdateProfile'
import UpdatePassword from './Components/User/UpdatePassword'
import ForgotPassword from './Components/User/ForgotPassword'
import ResetPassword from './Components/User/ResetPassword'
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping'
import ConfirmOrder from './Components/Cart/ConfirmOrder'
import axios from "axios";
import Payment from './Components/Cart/Payment'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './Components/Cart/OrderSuccess'
import MyOrders from './Components/Order/MyOrders'
import OrderDetails from './Components/Order/OrderDetails'
import Dashboard from './Components/Admin/Dashboard'
import ProductsList from './Components/Admin/ProductsList'
import NewProduct from "./Components/Admin/NewProduct";
import UpdateProduct from './Components/Admin/UpdateProduct'
import OrderList from './Components/Admin/OrderList'
import ProcessOrder from './Components/Admin/ProcessOrder'
import UsersList from './Components/Admin/UsersList'
import UpdateUser from './Components/Admin/UpdateUser'
import ProductReviews from './Components/Admin/ProductReviews'
import NotFound from "./Components/Layout/NotFound/NotFound";



function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")









  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey')

    setStripeApiKey(data.stripeApiKey)
  }


  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Driod Sans', 'Chilanka']
      }
    })

    store.dispatch(loadUser())

    getStripeApiKey()
  }, [])

  window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
    <>
      <Router forceRefresh={true}>
        <Headers />
        <Icons />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignup />} />
          {isAuthenticated && <Route exact path="/account" element={<Profile />} />}
          {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile />} />} 
          {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword />} />} 
          <Route exact path="/password/forgot" element={<ForgotPassword />} /> 
          <Route exact path="/password/reset/:token" element={<ResetPassword />} /> 
          <Route exact path="/cart" element={<Cart />} /> 
          {isAuthenticated && <Route exact path="/login/shipping" element={<Shipping />} />} 
          {isAuthenticated && <Route exact path="/order/confirm" element={<ConfirmOrder />} />} 
          {isAuthenticated && <Route exact path="/success" element={<OrderSuccess />} />} 
          {isAuthenticated && <Route exact path="/orders" element={<MyOrders />} />}
          {isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails />} />} 

          <Route exact isAdmin={true} path='/admin/dashboard' element={<ProtectedRoute element={Dashboard} />} />
          <Route exact isAdmin={true} path='/admin/products' element={<ProtectedRoute element={ProductsList} />} />
          <Route exact isAdmin={true} path='/admin/product/new' element={<ProtectedRoute element={NewProduct} />} />
          <Route exact isAdmin={true} path='/admin/product/:id' element={<ProtectedRoute element={UpdateProduct} />} />
          <Route exact isAdmin={true} path='/admin/orders' element={<ProtectedRoute element={OrderList} />} />
          <Route exact isAdmin={true} path='/admin/order/:id' element={<ProtectedRoute element={ProcessOrder} />} />
          <Route exact isAdmin={true} path='/admin/users' element={<ProtectedRoute element={UsersList} />} />
          <Route exact isAdmin={true} path='/admin/user/:id' element={<ProtectedRoute element={UpdateUser} />} />
          <Route exact isAdmin={true} path='/admin/reviews' element={<ProtectedRoute element={ProductReviews} />} />

          <Route element={<NotFound />}
          />
        </Routes>
        {stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            {isAuthenticated && <Route exact path="/process/payment" element={<Payment />} />}

          </Routes>
        </Elements>}

        <Footer />
      </Router>
    </>
  );
}

export default App;
