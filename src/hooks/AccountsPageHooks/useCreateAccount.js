import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import userApi from '../../api/userAPI';
import { addUsers } from "../../redux/user/allUsersSlice";
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import { parseToISOSDate, today } from "../../utils/parseDate";
import MyAlert from "../../components/MyAlert";
import notifyMessage from "../../utils/notifyMessage";

const useCreateAccount = (Users) =>{
let dispatch = useDispatch();
    const initialUserForm = useMemo(() =>{
        return {
        username: "",
        password: "",
        email: "",
        fullname: "",
        role: "student",
        repassword: "",
        dateofbirth: today()
    }},[])
const [userForm, setUserForm] = useState(initialUserForm)
const { username, password, email, fullname, role, repassword, dateofbirth } = userForm
const [openNewAccountModal, setopenNewAccountModal] = useState(false)
const [alert, setAlert] = useState(null)
  const closeAlert = () => setAlert(null)
  const onChange = (e) => {
    if (e.target.name === "dateofbirth")
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

  const onCreateAccountSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!(password === repassword))
      setAlert(<MyAlert type={"error"} message="Re-Password differ to Password!" close={() => { closeAlert() }} />)
    else {

      if (window.confirm("Create user account?")) {
        let rs = await userApi.register(userForm).catch(data => { return data.response })
        if (await rs.status === 201) {
          console.log(rs.data);
          dispatch(setSnackbar(notifyMessage.CREATE_SUCCESS("user")))
          dispatch(addUsers({
            ...userForm,
          }))
          setUserForm(initialUserForm)
          setopenNewAccountModal(false)
        }
        else {
          dispatch(setSnackbar(notifyMessage.CREATE_FAIL("user")))
        }
      }
    }
  }
  useEffect(() => {
    setUserForm(initialUserForm)
  }, [initialUserForm])

    return { username, password, email, fullname, role, repassword,
            dateofbirth, onChange, onCreateAccountSubmit,
            openNewAccountModal, setopenNewAccountModal, alert }

}

export default useCreateAccount