import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Modal, AppBar, Tab, Tabs } from '@mui/material';
import Login from './Login'
import SignUpForm from './SignUpForm';
import { useTheme } from '../Context/ThemeContext';
import GoogleButton from 'react-google-button';
import ErrorMapping from '../Utils/ErrorMapping';
import { toast } from 'react-toastify'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const AccountCircle = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);  //it return a arry

    const handleModalOpen = () => {
        if (user) {
            //navigate to user page
            navigate('/user');
        }
        else {
            setOpen(true);
        }

    }
    const handleClose = () => {
        setOpen(false);
    }

    const handelValueChange = (e, v) => {
        setValue(v);
    }

    //logout function
    const logout = () => {
        auth.signOut().then((res) => {
            toast.success('Logout successful ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }).catch((err) => {
            toast.error('not able to logout', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
    }

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider).then((res) => {
            toast.success('Google login successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            handleClose();
        }).catch((err) => {
            toast.error(ErrorMapping[err.code] || 'not able to do google authentication', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
    }

    return (
        <div>
            <AccountCircleIcon onClick={handleModalOpen} 
            style={{fontSize: "1.8rem", marginRight: "5px"}}/>
            {user && <LogoutIcon onClick={logout}
            style={{fontSize: "1.8rem"}} />}

            <Modal
                open={open}
                onClose={handleClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'

                }}
            >
                <div style={{ width: '400px', textAlign: 'center' }}>

                    <AppBar position='static' style={{ background: 'transparent' }}>
                        <Tabs
                            value={value}
                            onChange={handelValueChange}
                            variant='fullWidth'>
                            <Tab label='login' style={{ color: theme.textColor }}></Tab>
                            <Tab label='signup' style={{ color: theme.textColor }}></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <Login handleClose={handleClose} />}
                    {value === 1 && <SignUpForm handleClose={handleClose} />}

                    <box>
                        <span>OR</span>
                        <GoogleButton style={{ width: '88%', marginTop: '14px', marginLeft: '24px', borderRadius: '3px' }} onClick={handleGoogleSignIn} />
                    </box>
                </div>
            </Modal>
        </div>
    )
}

export default AccountCircle