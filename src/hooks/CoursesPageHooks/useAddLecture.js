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
    console.log(selectCourseID)


    const handleAddLecturer = async (lecturerId) => {
        let course = findElementById(selectCourseID, Courses)
        let lecturer = findElementById(lecturerId, Lecturers)
        if (!lecturerId && !selectCourseID) {
          dispatch(setSnackbar(notifyMessage.ERROR("lecturer or course is null!")))
          return
        }
        if (window.confirm(`Add lecturer ${lecturer.fullname} into course ?`)) {
          let updateForm = {
            username: lecturer.username,
            courseId: selectCourseID
          }
          console.log(updateForm)
          let rs = await courseApi.addLecturer(updateForm).catch(data => { return data.response })
          if (await rs.status === 200) {
            dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Lecturer added.")))
            setOpenAddLecturerModal(false)
            let tempcourse = {...course,
              lecturer: {
                username: lecturer.username,
                fullname: lecturer.fullname
              } };
            dispatch(updateCourses(tempcourse))
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