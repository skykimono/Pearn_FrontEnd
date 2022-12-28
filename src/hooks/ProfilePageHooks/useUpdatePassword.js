import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserValue } from '../../redux/user/userSlice';
import userApi from '../../api/userAPI';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import notifyMessage from '../../utils/notifyMessage';
import MyAlert from '../../components/MyAlert';

const useUpdatePassword = () => {
    let dispatch = useDispatch();
    const initialPasswordForm = useMemo(() => {
        return {
        oldPassword: "",
        newPassword: "",
        renewPassword: ""
    };
},[])
    const [passwordForm, setPasswordForm] = useState(initialPasswordForm)
    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState(null)
    const { oldPassword, newPassword, renewPassword } = passwordForm
    const onPasswordFormChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        })
    }

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)
    const checkPasswordChange = () => {
        return oldPassword === newPassword ? 1 : newPassword === renewPassword ? 0 : 2
    }
    const handleSubmitChangePassword = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        let rs = checkPasswordChange()

        if (rs === 1)
            setAlert(<MyAlert type={"error"} message="New password can't be the same with current password!" close={() => { setAlert(null) }} />)
        else if (rs === 2)
            setAlert(<MyAlert type={"error"} message="Re-New Password differ to New Password!" close={() => { setAlert(null) }} />)
        else {
            if (window.confirm("Change your password?")) {
                console.log(passwordForm)
                let rs = await userApi.changePasswordUser(passwordForm).catch(data => { return data.response })
                if (await rs.status === 200) {
                    setOpen(false)
                    dispatch(updateUserValue(rs.data))
                    dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("password")))

                }
                else {
                    if (rs.status === 400)
                        dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("password", "Current password is incorrect.")))
                    else
                        dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("password", "Try again")))
                }
            }
        }
    }
    useEffect(() => {
        setPasswordForm({ ...initialPasswordForm })
    }, [open, initialPasswordForm])

    return {oldPassword, newPassword, renewPassword, onPasswordFormChange, open, openModal, closeModal, alert, handleSubmitChangePassword}
}

export default useUpdatePassword