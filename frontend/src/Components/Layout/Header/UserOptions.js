import React, { useState } from 'react';
import './UserOptions.css';
import { StyledEngineProvider } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate } from 'react-router-dom';
import {useAlert} from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch} from 'react-redux';



const UserOptions = ({ user }) => {

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const alert = useAlert();
  const dispatch = useDispatch();
  
  

  const actions = [

    { icon: <i className="fa-solid fa-user"></i>, name: 'Profile', func: account },
    { icon: <i className="fa-solid fa-box-open"></i>, name: 'Orders', func: orders },
    { icon: <i className="fa-solid fa-right-from-bracket"></i>, name: 'Log Out', func: logOut },
  ];
  
  
    if (user.role === "admin") {
      actions.unshift({icon: <i className="fa-solid fa-database"></i>, name: 'Dashboard',func: dashboard})
    }
    
  function dashboard() {
    navigate('/admin/dashboard')
  }

  function account() {
    navigate('/account')
  }


  function orders() {
    navigate('/orders')
  }

  function logOut() {
    dispatch(logout())
    navigate('/login')
    alert.success("Logout Successfully")
}

  return (
    <>
      <StyledEngineProvider injectFirst>

        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          // sx={{ position: 'absolute', top: 30, right: 16 }}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          style={{ zIndex: "11" }}
          open={open}
          direction="down"
          className="speedDial"
          icon={
            <img
              className="speedDialIcon"
              src={user.avatar.url ? user.avatar.url : "/Profile.png"}
              // src="./Profile3.png"
              alt="Profile"
            />
          }
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.func}
            />
          ))}
        </SpeedDial>
      </StyledEngineProvider>
    </>
  )
}

export default UserOptions                  