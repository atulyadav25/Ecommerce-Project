import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/productAction';
import './ProductsList.css'
import { Link } from 'react-router-dom'
import MetaData from '../Layout/MetaData';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';


const ProductsList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error, products } = useSelector((state) => state.products);
    const {error: deleteError,isDeleted} = useSelector((state)=> state.product)


    useEffect(() => {
      if (error) {
          alert.error(error)
          dispatch(clearErrors())
      }


      if (deleteError) {
          alert.error(deleteError)
          dispatch(clearErrors())
      }

      if (isDeleted) {
          alert.success("Product Deleted Succesfully");
          navigate('/admin/dashboard');
          dispatch({type: DELETE_PRODUCT_RESET})
      }


      dispatch(getAdminProducts())
    }, [dispatch,error,alert,navigate,deleteError,isDeleted])

    const deleteProductHandler = (id)=>{
        dispatch(deleteProduct(id))
    }
    


    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "Number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "Number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 120,
            type: "Number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>

                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                        <i className="fa-solid fa-pen"></i>
                        </Link>

                        <button onClick={()=> deleteProductHandler(params.getValue(params.id, "id"))}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });



    return (
        <>
            <MetaData title={`ALL PRODUCTS - Admin`} />
        
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default ProductsList