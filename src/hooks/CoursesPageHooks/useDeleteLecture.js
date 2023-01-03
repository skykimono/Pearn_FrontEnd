import courseApi from "../../api/courseAPI";
import notifyMessage from "../../utils/notifyMessage";
import { updateCourses } from "../../redux/course/coursesSlice";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/snackbar/snackbarSlice";
import { findElementById, findLecturerByUsername } from '../../utils/uitility';

const useDeleteLecture = (selectLecturerID, selectCourseID, Courses, Lecturers, searchLecturersData, setSearchLecturersData) =>{
    const dispatch = useDispatch();
    const handleRemoveLecturer = async () => {
      console.log(selectLecturerID)
        if (!selectLecturerID) {
          dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("lecturer", "No lectuers assigned to be removed!")))
          return
        }
        else {
          let lecturer = findLecturerByUsername(selectLecturerID, Lecturers)
          let course = findElementById(selectCourseID, Courses)
          if (!lecturer && !course) {
            dispatch(setSnackbar(notifyMessage.ERROR("lecturer or course is null!")))
            return
          }
          if (window.confirm(`Remove lectuerer ${lecturer} from course ${course.code}-${course.name} ?`)) {
            let data = {
              courseId: selectCourseID
            }
            let rs = await courseApi.removeLecturer(data).catch(data => { return data.response })
            if (await rs.status === 200) {
              dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Lecturer removed.")))
              let tempcourse = {...course}
              delete tempcourse.lecturer
              console.log(tempcourse)
              dispatch(updateCourses(tempcourse))
              if (searchLecturersData.length > 0)
                setSearchLecturersData([])
            }
            else {
              if (rs.status === 400)
                dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "Cannot remove this lecturer.")))
              else
                dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course")))
            }
          }
        }
      }
      return {handleRemoveLecturer};
}

export default useDeleteLecture