import axiosClient from "./axiosClient"
const AuthPath = {
    GetUser: 'users',
    GetAllUser: 'auth/profile',
    PostUser: 'auth/profile',
    EditUser: 'auth/profile',
    DeleteUser: 'auth/profile',
    
}
const userApi = {
    getUser: (id) => {
        const url = `/user/${id}`
        return axiosClient.get(url)
    },
    getAllUsers: () => {
        const url = "/user/getAll"
        return axiosClient.get(url)
    },
    editUser: (id,body) => {
        const url = `/user/${id}`
        return axiosClient.patch(url, {...body})
    },
    deleteUser: (id) => {
        const url = `/user/${id}`
        return axiosClient.delete(url)
    },
    login: (body) => {
        const url ='auth/login'
        return axiosClient.post(url, {...body})
    },
    register: (body) => {
        const url = '/user/register'
        return axiosClient.post(url, {...body})
    }
}

export default userApi