const header = object => {
    const values = Object.values(object)
    return values.map(item => {
        return {
            key: fieldParse(item),
            value: item,
            width: fieldInclude(item)
        }
    })
}

const fieldParse = (str) => {
    if (str === "Course Code" || str === "Course Name")
        return str.trim().toLowerCase().split(" ").join("")
    if (str === "Lecturer")
        return "lecturerId"
    let tmp = str.trim().split(" ")
    tmp[0] = tmp[0].toLowerCase()

    return tmp.join("")
}
const fieldInclude = (str) => {
    let tmp = str.toUpperCase()
    if ((tmp.includes("NAME") || tmp.includes("LECTURER")) && !tmp.includes("USER")) {
        return 330
    }
    if(tmp.includes("AVERAGEGRADE")){
        return 650
    }
    if (tmp.includes("USER")|| tmp.includes("GRADE")) {
        return 250
    }
    if (tmp.includes("EMAIL")) {
        return 330
    }
    if(tmp.includes("SUBMISSION")){
        return 450
    }
    return 100
}
export default header