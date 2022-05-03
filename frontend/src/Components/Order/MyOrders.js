import React, { useEffect } from 'react'
import './MyOrders.css'
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction'
import Loader from '../Layout/Loader/Loader'
import { useAlert } from 'react-alert';
import {Link} from 'react-router-dom'
import MetaData from '../Layout/MetaData';
import { Typography } from '@mui/material';






const MyOrders = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders)
  const { user } = useSelector((state) => state.user)


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);


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
        return params.getValue(params.id, "status") === "Delivered"? "greenColor": "redColor";
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
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <i className="fa-solid fa-location-arrow"></i>
          </Link>
        );
      },
    }
  ];
  const rows = [];

  orders &&
  orders.forEach((item, index) => {
    rows.push({
      itemsQty: item.orderItems.length,
      id: item._id,
      status: item.orderStatus,
      amount: item.totalPrice,
    });
  });


  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 15, 20]}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </>
  )
}

export default MyOrders