
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
        const url = `api/user/get-lecturers`
        return axiosClient.get(url)
    },
    fetchAllStudents: () => {
        const url = `api/user/get-students`
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
    deleteUser: (id) => {
        const url = `/api/user/users/${id}`
        return axiosClient.delete(url)
    },
    login: (body) => {
        const url = `/auth/login`
        return axiosClient.post(url, { ...body })
    },
    register: (body) => {
        const url = '/api/auth/register'
        return axiosClient.post(url, { ...body })
    }
}
export default userApi