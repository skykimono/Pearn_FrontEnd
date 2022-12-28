import courseApi from "../../api/courseAPI";
import notifyMessage from "../../utils/notifyMessage";
import { updateCourses } from "../../redux/course/coursesSlice";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/snackbar/snackbarSlice";
import { findElementById } from '../../utils/uitility';

const useDeleteLecture = (selectLecturerID, selectCourseID, Courses, Lecturers, searchLecturersData, setSearchLecturersData) =>{
    const dispatch = useDispatch();
    const handleRemoveLecturer = async () => {
        if (!selectLecturerID) {
          dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("lecturer", "No lectuers assigned to be removed!")))
          return
        }
        else {
          let lecturer = findElementById(selectLecturerID, Lecturers)
          let course = findElementById(selectCourseID, Courses)
          if (!lecturer && !course) {
            dispatch(setSnackbar(notifyMessage.ERROR("lecturer or course is null!")))
            return
          }
          if (window.confirm(`Remove lectuerer ${lecturer.fullName} from course ${course.coursecode}-${course.coursename} ?`)) {
            let updateForm = {
              ...course,
              lecturerId: null
            }
            let rs = await courseApi.updateCourse(updateForm).catch(data => { return data.response })
            if (await rs.status === 200) {
              dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Lecturer removed.")))
              dispatch(updateCourses(rs.data))
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