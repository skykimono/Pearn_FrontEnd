import { useState, useEffect } from "react"
import { useCourses, useFetchAllCourses } from "../../redux/course/hook"


const useLoadCourses = () =>{
    useFetchAllCourses();
    const Courses = useCourses();
    const [rows, setRows] = useState([]);
    const [OpenMiniPopupCourses, setOpenMiniPopupCourses] = useState('');
    const [selectCourseID, setSelectCourseID] = useState("");
    const [OpenAddLecturerModal, setOpenAddLecturerModal] = useState(false)
    const [selectLecturerID, setSelectLecturerID] = useState("")
    useEffect(() => {
        if (Courses.length > 0) {
          let tmp = Courses.map((item, index) => {
            return {
              ...item,
              'no.': index + 1,
              lecturerId: item.lecturerId ? item.lecturerId : (courseId) => {
                setSelectCourseID(courseId)
                setOpenAddLecturerModal(true)
              },
              option: {
                type: "option",
                click: (courseId, lecturerId) => {
                  setOpenMiniPopupCourses(courseId)
                  setSelectCourseID(courseId)
                  setSelectLecturerID(lecturerId)
                }
              }
            }
          })
          setRows([...tmp])
        }
      }, [Courses])

      return { Courses, rows, selectCourseID, selectLecturerID, OpenMiniPopupCourses, 
        setOpenMiniPopupCourses, OpenAddLecturerModal ,setOpenAddLecturerModal }
}

export default useLoadCourses