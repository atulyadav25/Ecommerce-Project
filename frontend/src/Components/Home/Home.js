import React, { useEffect } from 'react';
import './Home.css';
import ProductCard from './ProductCard.js';
import Loader from '../Layout/Loader/Loader'
import MetaData from '../Layout/MetaData';
import {getProduct,clearErrors} from '../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux';
import {useAlert} from 'react-alert';



const Home = () => {

  const alert = useAlert();
  
  const dispatch = useDispatch();
  const {loading,error,products} = useSelector(state=>state.products)

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  }, [dispatch,error,alert])
  

  return (
    <>
      {loading ? <Loader/>:<><MetaData title="Ecommerce" />
        <div className="banner">
            <p>Welcome to Ecommerces</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>Scroll<i className="fa-solid fa-circle-nodes"></i></button>
            </a>
        </div>
        <h2 className='homeHeading'>Featured Products</h2>
        <div className="container" id="container">
          {products && products.map((product)=> <ProductCard key={product._id} product={product}/>)}
        </div></>}
    </>
  )
}

export default Home