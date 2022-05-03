import React, { useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import './Search.css'
import MetaData from '../Layout/MetaData'


const Search = () => {

    const history = useNavigate();

    const [keyword, setKeyword] = useState("")

    const searchSubmitHandler =  (e)=>{
        e.preventDefault();
        console.log("Hello");
        if (keyword.trim()) {
            history(`/products/${keyword}`)
        }
        else{
            history("/products")
        }
    }

  return (
    <>
    <MetaData title="Search A Product -- ECOMMERCE" />
    <form className="searchBox" onSubmit={searchSubmitHandler}>
      <input
        type="text"
        placeholder="Search a Product ..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form>
  </>
  )
}

export default Search