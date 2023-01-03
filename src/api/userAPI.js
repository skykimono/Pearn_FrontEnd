
import axiosClient from "./axiosClient"

const userApi = {
    fetchUser: () => {
        const url = `/auth/profile`
        return axiosClient.get(url)
    },
    fetchAllUsers: () => {
        const url = `/users`
        return axiosClient.get(url)
    },
    fetchAllLecturers: () => {
        const url = `users/lecturer`
        return axiosClient.get(url)
    },
    fetchAllStudents: () => {
        const url = `users/student`
        return axiosClient.get(url)
    },
    changePasswordUser: (body) => {
        const url = `/auth/password`
        return axiosClient.post(url, { ...body })
    },
    updateUser: (body) => {
        const url = `/auth/profile`
        return axiosClient.put(url, { ...body })
    },
    deleteUser: (username) => {
        var data ={
            username
          }
          console.log(data)
        const url = `/auth/delete`
        return axiosClient.delete(url, {data})
    },
    login: (body) => {
        const url = `/auth/login`
        return axiosClient.post(url, { ...body })
    },
    register: (body) => {
        const url = 'auth/register'
        return axiosClient.post(url, { ...body })
    }
}
export default userApi