import axiosClient from "./axiosClient"

const courseApi = {
    createCourse: (body) => {
        const url = `/course`
        return axiosClient.post(url, { ...body })
    },
    updateCourse: (body) => {
        const url = `/api/courses/`
        return axiosClient.patch(url, { ...body })
    },
    deleteCourse: (id) => {
        const url = `/course/${id}`
        return axiosClient.delete(url)
    },
    fetchAllCourses: () => {
        const url = `/course`
        return axiosClient.get(url)
    },
    fetchAllAssignedCourses: (id) => {
        const url = `/course/${id}`
        return axiosClient.get(url)
    },
    fetchAllStudentsAssigned: (id) => {
        const url = `/course/${id}`
        return axiosClient.get(url)
    },
    addStudentsForCourse: (body) => {
        const url = `/course/addStudent`
        return axiosClient.post(url, { ...body })
    },
    removeStudentsForCourse: (body) => {
        const url = `/course/deleteStudent`
        return axiosClient.post(url, { ...body })
    },
    addLecturer: (body) =>{
        const url =`/course/addLecturer`
        return axiosClient.post(url, {...body})
    },
    removeLecturer: (body) =>{
        const url =`course/removeLecturer`
        return axiosClient.post(url, body)
    }

}
export default courseApi