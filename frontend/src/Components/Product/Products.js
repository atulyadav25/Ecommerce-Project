import React, { useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, clearErrors } from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader'
import { useParams } from 'react-router-dom';
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import {useAlert} from 'react-alert';
import MetaData from '../Layout/MetaData'




const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "Sneakers"
]

const Products = () => {

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 250000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0);
    const { loading, error, products, productsCount, resultPerPage } = useSelector(state => state.products)

    const { keyword } = useParams();
  const alert = useAlert();


    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
          }
        dispatch(getProduct(keyword, currentPage, price, category,ratings))
    }, [dispatch, keyword, currentPage, price, category,ratings,error,alert])

    let count = productsCount;

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="PRODUCTS - ECOMMERCE"/>
                    <h2 className='productsHeading'>Products</h2>
                    <div className="products">
                        {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={250000}
                        />


                        <Typography>Categories</Typography>
                        <ul className='categoryBox'>
                            {categories.map((category) => {
                                return <li className='category-link' key={category} onClick={() => setCategory(category)}>{category}</li>
                            })}
                        </ul>

                        <fieldset>
                            <Typography component="legend">
                                Ratings Above
                            </Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>



                    {resultPerPage < count && (<div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="last"
                            itemClass='page-item'
                            linkClass='page-link'
                            activeClass='pageItemActive'
                            activeLinkClass='pageLinkActive'
                        />
                    </div>)}
                </>)}
        </>
    )
}

export default Products