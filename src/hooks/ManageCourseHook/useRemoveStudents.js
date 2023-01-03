import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import notifyMessage from '../../utils/notifyMessage';
import courseApi from '../../api/courseAPI';


const useRemoveStudents = (checkStudents, courseId, studentsAssignedRows, setStudentsAssignedRows) =>{
    const dispatch = useDispatch();
    const [OpenRemoveStudentsModal, setOpenRemoveStudentsModal] = useState(false);
    const [searchStudentsRemovedData, setSearchStudentsRemovedData] = useState([]);
    const handleRemoveStudent = async (event) => {
        event.preventDefault()
        event.stopPropagation()
    
        if (checkStudents.length > 0) {
          if (window.confirm(`Remove all students selected ?`)) {
            let updateForm = {
              usernames: checkStudents,
              courseId: courseId
            }
            console.log(updateForm)
            let rs = await courseApi.removeStudentsForCourse(updateForm).catch(data => { return data.response })
            if (await rs.status === 200) {
              dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Students removed.")))
              setOpenRemoveStudentsModal(false)
    
              let newStudents = studentsAssignedRows.filter(item => { return !checkStudents.includes(item.username) })
              newStudents = newStudents.map((item, index) => {
                return {
                  ...item,
                  'no.': index + 1,
                  id: index,
                }
              })
              setStudentsAssignedRows([
                ...newStudents
              ])
              if (searchStudentsRemovedData.length > 0)
                setSearchStudentsRemovedData([])
            }
            else {
              if (rs.status === 400)
                dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "Cannot add this students.")))
              else
                dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course")))
            }
          }
        }
        else {
          dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "No students selected!")))
        }
      }

      return {handleRemoveStudent, OpenRemoveStudentsModal, setOpenRemoveStudentsModal, searchStudentsRemovedData,
    setSearchStudentsRemovedData}
}

export default useRemoveStudents