import { useState, useEffect } from "react";
import { loadApi } from "../api/load.api";


const useProfile = () =>{
        const [isLoading, setIsLoading] = useState(true);
        const [fullname, setFullname] = useState('');
        const [email, setEmail] = useState('');
        const [role, setRole] = useState('');
        const  fetchProfile = async() =>{
        const dataFromAPI = await loadApi.loadProfile();
           let tempfullname = dataFromAPI.fullname;
           let temptemail = dataFromAPI.email;
           let temprole = dataFromAPI.role;
            setFullname(tempfullname);
            setEmail(temptemail);
            setRole(temprole);
            setIsLoading(false);
        }
        useEffect(()=>{
           fetchProfile();
        },[])

        return {fullname, email, role, isLoading};
}

export default useProfile;