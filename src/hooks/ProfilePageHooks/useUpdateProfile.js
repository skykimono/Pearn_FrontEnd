import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserValue } from '../../redux/user/userSlice';
import userApi from '../../api/userAPI';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import notifyMessage from '../../utils/notifyMessage';
import { parseToISOSDate } from '../../utils/parseDate';

const useUpdateProfile = (userState) => {
    let dispatch = useDispatch()
    const pictureRef = useRef(null)
    const initialUserForm = {
        fullname: "",
        email: "",
        dateofbirth: ""
    }
    const [userForm, setUserForm] = useState(initialUserForm)
    const { fullname, email, dateofbirth } = userForm
    const uploadPicture = () => pictureRef.current.click()
    const onAvatarChange = (e) => {
        var file = e.target.files
        if (FileReader && file && file.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('avatar').childNodes[0].src = fr.result;
                setUserForm({
                    ...userForm,
                    'avatar': fr.result
                })
            }
            fr.readAsDataURL(file[0]);
        }

    }
    const onChange = (e) => {
        if (e.target.name === "dateOfBirth")
            setUserForm({
                ...userForm,
                [e.target.name]: parseToISOSDate(e.target.value)
            })
        else {
            setUserForm({
                ...userForm,
                [e.target.name]: e.target.value
            })
        }

    }
    const handleUpdate = async (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (window.confirm("Update user profile?")) {
            let rs = await userApi.updateUser(userForm).catch(data => { return data.response })
            if (await rs.status === 200) {
                dispatch(updateUserValue(rs.data))
                dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("user")))
            }
            else {
                dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("user")))
            }
        }
    }
    useEffect(() => {
        if (Object.keys(userState.value).length) {
            setUserForm({ ...userState.value })
        }
    }, [userState])

    return {userForm, setUserForm, pictureRef, fullname, email, dateofbirth, onChange, onAvatarChange, handleUpdate, uploadPicture};
}

export default useUpdateProfile

