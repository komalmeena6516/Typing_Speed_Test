import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Modal, AppBar, Tab, Tabs } from '@mui/material';
import Login from './Login'
import SignUpForm from './SignUpForm';
import { useTheme } from '../Context/ThemeContext';
import GoogleButton from 'react-google-button';

const AccountCircle = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const {theme} = useTheme();

    const handleModalOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handelValueChange = (e, v) => {
        setValue(v);
    }
    return (
        <div>
            <AccountCircleIcon onClick={handleModalOpen} />

            <Modal
                open={open}
                onClose={handleClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'

                }}
            >
                <div style={{ width: '400px' }}>

                    <AppBar position='static' style={{ background: 'transparent' }}>
                        <Tabs
                            value={value}
                            onChange={handelValueChange}
                            variant='fullWidth'>
                            <Tab label='login' style={{ color: theme.textColor}}></Tab>
                            <Tab label='signup' style={{ color: theme.textColor}}></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <Login/>}
                    {value === 1 && <SignUpForm/>}
                </div>
            </Modal>
        </div>
    )
}

export default AccountCircle