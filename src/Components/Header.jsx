
import AccountCircle from './AccountCircle';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import KeyboardOutlinedIcon from '@mui/icons-material/KeyboardOutlined';

const Header = () => {
const navigate = useNavigate();

const openHomePage = ()=>{
  navigate("/");
}

  return (

    <div className="header">
      <div className="logo" onClick={openHomePage}>
        < KeyboardOutlinedIcon style={{ fontSize: "3rem" }} />
        <span className='logo-name'>DragonTyping</span>
      </div>
      <div className="user-icon">
        <AccountCircle />
      </div>
    </div>
  )
}

export default Header