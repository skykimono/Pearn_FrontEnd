import { useState, useEffect } from "react";
import { loadApi } from "../api/load.api";


const useLoadUser = () =>{
        const [isLoading, setIsLoading] = useState(true);
        const [users, setUsers] = useState([])
        const  fetchUsers = async() =>{
        const dataFromAPI = await loadApi.loadUsers();
            setUsers(dataFromAPI);
            setIsLoading(false);
        }
        useEffect(()=>{
           fetchUsers();
        },[])

        return {users, isLoading};
}

export default useLoadUser;