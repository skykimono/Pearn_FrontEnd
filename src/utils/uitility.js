export const findElementById = (id, data) => {
    if (data.length > 0) {
        return data.find(item => item.id === id)
    }
    return null
}
export const findCourseByCode = (code, data) => {
    if (data.length > 0) {
        return data.find(item => item.coursecode === code)
    }
    return null
}