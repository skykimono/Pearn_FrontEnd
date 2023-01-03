import { useState } from "react";
import { addCourses } from "../../redux/course/coursesSlice";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/snackbar/snackbarSlice";
import courseApi from "../../api/courseAPI";
import notifyMessage from "../../utils/notifyMessage";

const useCreateCourse = () =>{
    const dispatch = useDispatch();
    const initialCourseForm = {
        name: "",
        code: "",
        locked: false,
      }
    const [OpenCreateCourseModal, setOpenCreateCourseModal] = useState(false)
    const [courseForm, setCourseForm] = useState(initialCourseForm)
    const { name, code } = courseForm
    const [searchCourseData, setSearchCourseData] = useState([])


    const onCourseFormChange = (e) => {
        setCourseForm({
          ...courseForm,
          [e.target.name]: e.target.value
        })
      }

      const handleCreateCourse = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (window.confirm("Create course?")) {
          let rs = await courseApi.createCourse(courseForm).catch(data => { return data.response })
          if (await rs.status === 201) {
            dispatch(setSnackbar(notifyMessage.CREATE_SUCCESS("course")))
            dispatch(addCourses(courseForm))
            setCourseForm(initialCourseForm)
            setOpenCreateCourseModal(false)
            
            if (searchCourseData.length > 0)
              setSearchCourseData([])
          }
          else {
            if (rs.status === 400)
              dispatch(setSnackbar(notifyMessage.CREATE_FAIL("course", "course code or name has existed!")))
            else
              dispatch(setSnackbar(notifyMessage.CREATE_FAIL("course")))
          }
        }
      }

      return {name, code, handleCreateCourse, onCourseFormChange, OpenCreateCourseModal, setOpenCreateCourseModal,
    searchCourseData, setSearchCourseData};
}

export default useCreateCourse