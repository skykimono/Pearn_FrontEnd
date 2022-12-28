import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUsers } from "../../redux/user/allUsersSlice";
import notifyMessage from '../../utils/notifyMessage';
import userApi from "../../api/userAPI";
import { setSnackbar } from "../../redux/snackbar/snackbarSlice";
const useDeleteAccounts = (selectID) => {
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState([]);
    const deleteAccount = async () => {

        if (window.confirm("Delete user ?")) {
          let rs = await userApi.deleteUser(selectID).catch(data => { return data.response })
          if (await rs.status === 200) {
            if (searchData.length > 0)
              setSearchData([])
            dispatch(deleteUsers(selectID))
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
