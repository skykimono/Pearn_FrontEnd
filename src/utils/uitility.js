export const findElementById = (id, data) => {
    if (data.length > 0) {
        return data.find(item => item._id === id)
    }
    return null
}

export const findElementByUsername = (username, data) =>{
    if(data.length > 0) {
        return data.find(item => item.username === username)
    }
    return null
}

export const findCourseByCode = (code, data) => {
    if (data.length > 0) {
        return data.find(item => item.coursecode === code)
    }
    return null
}
export const findLecturerByUsername = (username, data) =>{
    let index = data.findIndex(item => item.username === username)
    return data[index].fullname;
}