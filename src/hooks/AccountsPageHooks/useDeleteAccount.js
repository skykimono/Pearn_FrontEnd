import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUsers } from "../../redux/user/allUsersSlice";
import notifyMessage from '../../utils/notifyMessage';
import userApi from "../../api/userAPI";
import { setSnackbar } from "../../redux/snackbar/snackbarSlice";
import { findElementById } from "../../utils/uitility";
const useDeleteAccounts = (selectID, rows, Users) => {
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState([]);
    const deleteAccount = async () => {
      let deleteaccount = findElementById(selectID, Users)
        if (window.confirm("Delete user ?")) {
          let rs = await userApi.deleteUser(deleteaccount.username).catch(data => { return data.response })
          if (await rs.status === 200) {
            if (searchData.length > 0)
              setSearchData([])
            dispatch(deleteUsers(deleteaccount.username))
            dispatch(setSnackbar(notifyMessage.DELETE_SUCCESS("user")))
    
          }
          else {
            dispatch(setSnackbar(notifyMessage.DELETE_FAIL("user")))
          }
        }
      }
      return {deleteAccount, searchData, setSearchData};
}

export default useDeleteAccounts
