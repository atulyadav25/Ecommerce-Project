import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import './ProductsList.css'
import { Link } from 'react-router-dom'
import MetaData from '../Layout/MetaData';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { getAllOrders,clearErrors, deleteOrder } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';


const OrderList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);


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
          alert.success("Order Deleted Succesfully");
          navigate('/admin/orders');
          dispatch({type: DELETE_ORDER_RESET})
      }


      dispatch(getAllOrders())
    }, [dispatch,error,alert,deleteError,isDeleted,navigate])

    const deleteOrderHandler = (id)=>{
        dispatch(deleteOrder(id))
    }
    


    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 300, 
            flex: 1
          },
          {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
              return params.getValue(params.id, "status") === "Delivered"? "greenColor-a": "redColor-a";
            },
          },
          {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "Number",
            minWidth: 150,
            flex: 0.3
          },
          {
            field: "amount",
            headerName: "Amount",
            type: "Number",
            minWidth: 270,
            flex: 0.5
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

                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                        <i className="fa-solid fa-pen"></i>
                        </Link>

                        <button onClick={()=> deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    orders &&
    orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });



    return (
        <>
            <MetaData title={`ALL Orders - Admin`} />
        
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

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

export default OrderList