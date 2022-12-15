import React from 'react'
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import MyButton from '../components/MyButton';
import { useState, useEffect } from 'react';
import { LoginApi } from '../api/login.api';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);
    let navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try{var res = await LoginApi.login(username,password); 
        navigate('/profile');}
        catch(err){setIsSuccess(false);}
    }

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            navigate('/profile');
        }
    },[])
    
    return (
        <div className='login'>
            <div className='login-form'>
                <div className="login-form-header">
                    <div className="login-form-header-logo">
                        <img src="https://www.creativefabrica.com/wp-content/uploads/2021/10/23/Cute-Blink-Penguin-Face-Illustration-Graphics-19152654-1.jpg" alt="Pegiun Logo" />
                    </div>
                    <div className="login-form-header-title">
                        Pearn
                    </div>
                </div>
                <div className='login-form-body'>
                    <Box component="form" onSubmit={handleSubmit} sx={{ height: '100%' }} >
                        <TextField
                            inputProps={{ className: "textField" }}
                            InputLabelProps={{ className: "textField" }}
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="Username"
                            autoComplete="text"
                            type="text"
                            autoFocus
                            value={username}
                            onChange= {e => setUsername(e.target.value)}
                        // error
                        />
                        <TextField

                            inputProps={{ className: "textField" }}
                            InputLabelProps={{ className: "textField" }}
                            margin="normal"
                            required
                            fullWidth
                            label="Password:"
                            name="Password"
                            type="password"
                            value={password}
                            onChange= {e => setPassword(e.target.value)}
                        // error
                        />
                        <div className='Line'></div>
                        <div>
                            {!isSuccess&&(<div className="login-form-error">Login Failed!</div>)}
                            <MyButton type="submit" fullWidth >Login</MyButton>
                        </div>
                    </Box>
                </div>
            </div>

        </div>
    )
}

export default Login