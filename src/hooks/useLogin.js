import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/user/userSlice';
import { setLoading } from '../redux/user/loginLoadingSlice';
import { useNavigate } from 'react-router-dom';
import { Alert } from "@mui/material";

const useLogin = ()=> {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const userState = useSelector(state => state.userState)
    const initialForm = {
        username: "",
        password: ""
    }
    const [loginForm, setLoginForm] = useState(initialForm)
    const [alert, setAlert] = useState(null)
    const { username, password } = loginForm
    const onChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        event.stopPropagation();
        dispatch(login(loginForm))

    }
    useEffect(() => {
        if (userState.loading === false) {
            dispatch(setLoading(false))
            if (userState.err && userState.err !== "") {
                setAlert(<Alert severity="error">{userState.err}!</Alert>)
            }
            else if (userState.user) {
                navigate('/')
            }
        }
        else
            dispatch(setLoading(true))
    }, [userState, dispatch, navigate]);

    useEffect(() => {
        let timer1 = setTimeout(() => {
            setAlert(null)
        }, 2000)
        return () => {
            clearTimeout(timer1)
        }
    }, [alert])

        return { username, password, onChange,  alert, handleSubmit};
}
export default useLogin;

