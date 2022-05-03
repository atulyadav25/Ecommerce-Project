import React, { useState, useEffect } from 'react'
import './newProduct.css'
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, clearErrors } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';


const NewProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const { loading, error, success } = useSelector((state) => state.newProduct);


    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])


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


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            alert.success("Product Created Succesfully")
            navigate('/admin/dashboard')
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [error, alert, dispatch, success, navigate])




    const createProductSubmitHandler = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("description",description);
        myForm.set("category",category);
        myForm.set("description",description);
        myForm.set("stock",stock);

        images.forEach((image)=>{
            myForm.append("images",image);
        });

        dispatch(createProduct(myForm))

    }


    const createProductImagesChange = (e)=>{
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);


        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = ()=>{
                if (reader.readyState === 2) {
                    setImagesPreview((old)=> [...old,reader.result]);
                    setImages((old)=> [...old,reader.result])
                }
            }

            reader.readAsDataURL(file)

        });

    }


    return (
        <>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                        <i className="fa-solid fa-spell-check i-login"></i>
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                        <i className="fa-solid fa-indian-rupee-sign i-login"></i>
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                        <i className="fa-solid fa-file-pen i-login"></i>

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                        <i className="fa-solid fa-code-branch i-login"></i>
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                        <i className="fa-solid fa-cubes-stacked i-login"></i>
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewProduct