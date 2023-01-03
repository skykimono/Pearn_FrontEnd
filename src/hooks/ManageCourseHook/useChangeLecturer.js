import {useState, useEffect, useCallback } from 'react';
import { useLecturers, useFetchAllLecturers } from '../../redux/user/hook';
import { useCourses, useFetchAllCourses } from '../../redux/course/hook';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import notifyMessage from '../../utils/notifyMessage';
import { useDispatch } from 'react-redux';
import { findElementById } from '../../utils/uitility';
import courseApi from '../../api/courseAPI';
import { updateCourses } from '../../redux/course/coursesSlice';


const useChangeLecturer = (courseId) =>{
    let dispatch = useDispatch();
    useFetchAllLecturers();
    useFetchAllCourses();
    const Lecturers = useLecturers()
    const Courses = useCourses()
    const [OpenChangeLecturerModal, setOpenChangeLecturerModal] = useState(false)
    const [searchLecturersData, setSearchLecturersData] = useState([])
    const [leturersRows, setLecturersRows] = useState([])
    const course = findElementById(courseId, Courses)
    const lecturer = findElementById(course ? course.lecturerId : "", Lecturers)

    const handleChangeLecturer = useCallback(async (lecturerId) => {
        let lecturer = findElementById(lecturerId, Lecturers)
        if (!lecturer && !course) {
          dispatch(setSnackbar(notifyMessage.ERROR("lecturer or course is null!")))
          return
        }
        if (window.confirm(`Add lectuerer ${lecturer.fullname} into course ${course.code}-${course.name} ?`)) {
          let updateForm = {
            username: lecturer.username,
            courseId
          }
          let rs = await courseApi.addLecturer(updateForm).catch(data => { return data.response })
          if (await rs.status === 200) {
            dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Lecturer added.")))
            setOpenChangeLecturerModal(false)
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
      },[Lecturers, course, dispatch, searchLecturersData.length])
      
      useEffect(() => {
        if (Lecturers.length > 0) {
          let tmp = Lecturers.map((item, index) => {
            return {
              ...item,
              'no.': index + 1,
              option: {
                type: "confirm",
                click: (lecturerId) => {
                  handleChangeLecturer(lecturerId)
                }
              }
            }
          })
          setLecturersRows([...tmp])
        }
      }, [Lecturers, handleChangeLecturer])

      return {OpenChangeLecturerModal, setOpenChangeLecturerModal,
    searchLecturersData, setSearchLecturersData, leturersRows, course, lecturer }
}

export default useChangeLecturer