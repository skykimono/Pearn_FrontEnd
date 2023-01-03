import { useEffect, useState } from 'react'
import { useUsers, useFetchAllUsers } from '../../redux/user/hook';


const  useLoadAccounts = () =>{
    useFetchAllUsers()
    const Users = useUsers();
    const [rows, setRows] = useState([]);
    const [OpenMiniPopupAccounts, setOpenMiniPopupAccounts] = useState("");
    const [selectID, setSelectID] = useState("");

    useEffect(() => {
        let tmp = Users.filter(item => item.role !== "admin")
    
        tmp = tmp.map((item, index) => {
          return {
            ...item,
            'no.': index,
            option: {
              type: "option",
              click: (id) => {
                setOpenMiniPopupAccounts(id)
                setSelectID(id)
              }
            }
          }
        })
        setRows([...tmp])
      }, [Users])

      return {Users, rows, OpenMiniPopupAccounts, setOpenMiniPopupAccounts, selectID};
}

export default useLoadAccounts