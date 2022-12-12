import React from 'react'
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import MyButton from '../components/MyButton';
const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("Submit login form");
    }
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
                            autoComplete="email"
                            type="email"
                            autoFocus

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
                        // error
                        />
                        <div className='Line'></div>
                        <div>
                            <MyButton type="submit" fullWidth >Login</MyButton>
                        </div>
                    </Box>
                </div>
            </div>

        </div>
    )
}

export default Login