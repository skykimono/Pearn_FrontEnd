import { CommonApi } from "./axiosClient";

const api = CommonApi.api;

const profilepath = "/auth/profile";



function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function sleep() {
    await timeout(500);
    return true;
  }

export const loadApi ={
    loadProfile: async function(){
        await sleep(5000);
        const result = await api.get(profilepath);
        return result.data;
    },
    loadUsers: async function(){
      await sleep(5000);
      const result = await api.get('/users');
      return result.data
    },
    deleteUsers: async function(username){
      var data ={
        username
      }
      console.log(data)
       const result = await api.delete('/auth/delete',{data});
       return result
    },
    createUser: async function(username, password, fullname, email, role) {
      var data= {
        username,
        password,
        fullname,
        email,
        role
      }
      const result = await api.post('/auth/register',data);
      return result
    },
    editUser: async function(fullname, email) {
      var data={
        ...(fullname && {fullname: fullname}),
       ...(email && {email: email})
      }
      console.log(data);
      const result = await api.put('/auth/profile',data)
      return result;
    },
    changePassword: async function(oldPassword, newPassword){
      var data={
        oldPassword,
        newPassword
      }
      const result = await api.post('/auth/password',data);
      return result;
    }
}