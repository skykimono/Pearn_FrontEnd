import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { removeSnackbar } from '../redux/snackbar/snackbarSlice';
const MySnackbar = () => {
    let dispatch = useDispatch()
    const snackbarState = useSelector(state => state.snackbarState)
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const onClose =() =>{
            dispatch(removeSnackbar(false))
    }
    return (
        <Snackbar open={snackbarState.state} autoHideDuration={2000} onClose={onClose} >
            <Alert severity={snackbarState.type} sx={{ width: '100%' }} onClose={onClose}>
                {snackbarState.message}
            </Alert>
        </Snackbar>
    )
}



export default MySnackbar
