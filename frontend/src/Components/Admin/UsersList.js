import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import './ProductsList.css'
import { Link } from 'react-router-dom'
import MetaData from '../Layout/MetaData';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { getAllUsers,clearErrors, deleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';


const UsersList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error, users } = useSelector((state) => state.allUsers);
    const {error: deleteError,isDeleted,message} = useSelector((state)=> state.profile)


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
          alert.success(message);
          navigate('/admin/users');
          dispatch({type: DELETE_USER_RESET})
      }


      dispatch(getAllUsers())
    }, [dispatch,error,alert,message,navigate,deleteError,isDeleted])

    const deleteUserHandler = (id)=>{
        dispatch(deleteUser(id))
    }
    


    const columns = [
      { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

      {
        field: "email",
        headerName: "Email",
        minWidth: 200,
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 0.5,
      },
  
      {
        field: "role",
        headerName: "Role",
        type: "number",
        minWidth: 150,
        flex: 0.3,
        cellClassName: (params) => {
          return params.getValue(params.id, "role") === "admin"
            ? "greenColor"
            : "redColor";
        },
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
            <>
              <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <i className="fa-solid fa-pen"></i>
              </Link>
  
              <button
                onClick={() =>
                  deleteUserHandler(params.getValue(params.id, "id"))
                }
              >
               <i className="fa-solid fa-trash"></i>
              </button>
            </>
          );
        },
      },
    ];

    const rows = [];

    users &&
    users.forEach((item) => {
            rows.push({
                id: item._id,
                email: item.email,
                name: item.name,
                role: item.role,
            });
        });



    return (
        <>
            <MetaData title={`ALL USERS - Admin`} />
        
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

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


export default UsersList