import { useDispatch } from "react-redux";
import courseApi from "../../api/courseAPI";
import { setSnackbar } from "../../redux/snackbar/snackbarSlice";
import notifyMessage from "../../utils/notifyMessage";
import { deleteCourses } from "../../redux/course/coursesSlice";
import { findElementById } from '../../utils/uitility';


const useDeleteCourse = (searchCourseData, setSearchCourseData, selectCourseID, Courses) => {
    const dispatch = useDispatch();
    const handleDeleteCourse = async () => {

        // let course = findElementById(selectCourseID, Courses)
        console.log(selectCourseID);
        if (!selectCourseID) {
          dispatch(setSnackbar(notifyMessage.ERROR("course is null!")))
          return
        }
        if (window.confirm(`Delete course  ?`)) {
    
          let rs = await courseApi.deleteCourse(selectCourseID).catch(data => { return data.response })
          if (await rs.status === 200) {
            dispatch(setSnackbar(notifyMessage.DELETE_SUCCESS("course", "Lecturer removed.")))
            dispatch(deleteCourses(selectCourseID))
            if (searchCourseData.length > 0)
              setSearchCourseData([])
          }
          else {
            if (rs.status === 400)
              dispatch(setSnackbar(notifyMessage.DELETE_FAIL("course", "Cannot delete this course.")))
            else
              dispatch(setSnackbar(notifyMessage.DELETE_FAIL("course")))
          }
        }
    
      }

      return {handleDeleteCourse};
}

export default useDeleteCourse