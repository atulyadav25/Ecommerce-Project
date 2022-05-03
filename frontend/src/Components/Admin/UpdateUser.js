import React, { useState, useEffect } from 'react'
import './newProduct.css'
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { getUserDetails, updateUser,clearErrors } from '../../actions/userAction';
import Loader from '../Layout/Loader/Loader';


const UpdateUser = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {id} = useParams()


    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const userId = id;



    useEffect(() => {

        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }


        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("User Updated Succesfully")
            navigate('/admin/users')
            dispatch({ type: UPDATE_USER_RESET })
        }

    }, [error, alert, dispatch, isUpdated,user,updateError,userId, navigate])




    const updateUserSubmitHandler = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("role",role);

        dispatch(updateUser(userId,myForm))

    }


 
    return (
        <>
            <MetaData title="Update User" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                   {loading? (<Loader />): ( <form
                        className="createProductForm"
                        onSubmit={updateUserSubmitHandler}
                    >
                        <h1>Update User</h1>

                        <div>
                        <i className="fa-solid fa-user i-login"></i>
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                        <i className="fa-solid fa-envelope i-login"></i>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>


                        <div>
                        <i className="fa-solid fa-shield i-login"></i>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                
                            </select>
                        </div>



                        <button
                            id="createProductBtn"
                            type="submit"
                            disabled={updateLoading ? true : false || role === ""? true:false}
                        >
                            Update
                        </button>
                    </form>)}
                </div>
            </div>
        </>
    )
}


export default UpdateUser