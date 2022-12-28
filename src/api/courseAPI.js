import axiosClient from "./axiosClient"

const courseApi = {
    createCourse: (body) => {
        const url = `/api/courses/`
        return axiosClient.post(url, { ...body })
    },
    updateCourse: (body) => {
        const url = `/api/courses/`
        return axiosClient.patch(url, { ...body })
    },
    deleteCourse: (id) => {
        const url = `/api/courses/${id}`
        return axiosClient.delete(url)
    },
    fetchAllCourses: () => {
        const url = `/api/courses/get-all`
        return axiosClient.get(url)
    },
    fetchAllAssignedCourses: () => {
        const url = `/api/courses/get-assign-course`
        return axiosClient.get(url)
    },
    fetchAllStudentsAssigned: (id) => {
        const url = `/api/course-user/course-students/${id}`
        return axiosClient.get(url)
    },
    addStudentsForCourse: (body) => {
        const url = `/api/course-user/add-students/`
        return axiosClient.post(url, { ...body })
    },
    removeStudentsForCourse: (body) => {
        const url = `/api/course-user/remove-students/`
        return axiosClient.patch(url, { ...body })
    },

}
export default courseApi