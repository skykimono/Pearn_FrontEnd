import { useState, useEffect } from 'react';
import courseApi from '../../api/courseAPI';
import { useDispatch } from 'react-redux';
import { findElementById } from '../../utils/uitility';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import notifyMessage from '../../utils/notifyMessage';
import { useStudents, useFetchAllStudents } from '../../redux/user/hook';


const useAddStudents = (checkStudents, courseId, studentsAssignedRows, setStudentsAssignedRows) => {
    useFetchAllStudents();
    const Students = useStudents();
    console.log(Students);
    const dispatch = useDispatch();
    const [OpenAddStudentsModal, setOpenAddStudentsModal] = useState(false)
    const [searchStudentsAddedData, setSearchStudentsAddedData] = useState([])
    const [studentsAddedRows, setStudentsAddedRows] = useState([])
    const handleAddStudents = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (checkStudents.length > 0) {
          if (window.confirm(`Add all students selected ?`)) {
            let updateForm = {
              courseId: courseId,
              studentIdList: checkStudents
            }
            let rs = await courseApi.addStudentsForCourse(updateForm).catch(data => { return data.response })
            if (await rs.status === 200) {
              dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Students added.")))
              setOpenAddStudentsModal(false)
    
              let newStudents = checkStudents.map((item, index) => {
                return {
                  ...findElementById(item, Students),
                  'no.': studentsAssignedRows.length + index + 1,
                  option: {
                    type: "option",
                    click: (id) => {
    
                    }
                  }
                }
              })
              setStudentsAssignedRows([
                ...studentsAssignedRows,
                ...newStudents
              ])
              if (searchStudentsAddedData.length > 0)
                setSearchStudentsAddedData([])
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

      useEffect(() => {
        if (Students.length > 0) {
          let tmp = Students.filter((item, index) => {
            return studentsAssignedRows.findIndex(itemS => itemS.id === item.id) === -1
          })
    
          tmp = tmp.map((item, index) => {
            return {
              ...item,
              'no.': index + 1,
              option: {
                type: "",
                click: (id) => {
                }
              }
            }
          })
          setStudentsAddedRows([...tmp])
        }
    
      }, [Students, studentsAssignedRows])
      return {Students, handleAddStudents, OpenAddStudentsModal, setOpenAddStudentsModal, 
    searchStudentsAddedData, setSearchStudentsAddedData, studentsAddedRows}
}

export default useAddStudents