import { useState, useMemo } from "react"
import { useLecturers, useFetchAllLecturers } from "../../redux/user/hook"
import courseApi from "../../api/courseAPI";
import { useDispatch } from "react-redux";
import notifyMessage from "../../utils/notifyMessage";
import { updateCourses } from "../../redux/course/coursesSlice";
import { setSnackbar } from "../../redux/snackbar/snackbarSlice";
import { findElementById } from '../../utils/uitility';

const useAddLecture = (selectCourseID, Courses, setOpenAddLecturerModal) =>{
    useFetchAllLecturers();
    let dispatch = useDispatch();
    const Lecturers = useLecturers();
    const [leturersRows, setLecturersRows] = useState([]);
    const [searchLecturersData, setSearchLecturersData] = useState([]);




    const handleAddLecturer = async (lecturerId) => {

        let lecturer = findElementById(lecturerId, Lecturers)
        let course = findElementById(selectCourseID, Courses)
        console.log(lecturer, course);
        if (!lecturer && !course) {
          dispatch(setSnackbar(notifyMessage.ERROR("lecturer or course is null!")))
          return
        }
        if (window.confirm(`Add lectuerer ${lecturer.fullName} into course ${course.coursecode}-${course.coursename} ?`)) {
          let updateForm = {
            ...course,
            lecturerId: lecturerId
          }
          let rs = await courseApi.updateCourse(updateForm).catch(data => { return data.response })
          if (await rs.status === 200) {
            dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Lecturer added.")))
            setOpenAddLecturerModal(false)
            dispatch(updateCourses(rs.data))
            if (searchLecturersData.length > 0)
              setSearchLecturersData([])
          }
          else {
            if (rs.status === 400)
              dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "Cannot add this lecturer.")))
            else
              dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course")))
          }
        }
      }

    useMemo(() => {
        if (Lecturers.length > 0) {
          let tmp = Lecturers.map((item, index) => {
            return {
              ...item,
              'no.': index + 1,
              option: {
                type: "confirm",
                click: (lecturerId) => {
                  handleAddLecturer(lecturerId);
                }
              }
            }
          })
          setLecturersRows([...tmp])
        }
      }, [selectCourseID])

      return { Lecturers, leturersRows, searchLecturersData, setSearchLecturersData};
}

export default useAddLecture