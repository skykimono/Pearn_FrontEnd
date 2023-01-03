import { useState, useEffect } from 'react';
import courseApi from '../../api/courseAPI';
import { useDispatch } from 'react-redux';
import { findElementByUsername } from '../../utils/uitility';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import notifyMessage from '../../utils/notifyMessage';
import { useStudents, useFetchAllStudents } from '../../redux/user/hook';


const useAddStudents = (courseId, studentsAssignedRows, setStudentsAssignedRows) => {
    useFetchAllStudents();
    const Students = useStudents();
    const dispatch = useDispatch();
    const [OpenAddStudentsModal, setOpenAddStudentsModal] = useState(false)
    const [searchStudentsAddedData, setSearchStudentsAddedData] = useState([])
    const [studentsAddedRows, setStudentsAddedRows] = useState([])
     const [checkAddedStudents, setCheckAddedStudents] = useState([])
    const handleAddStudents = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (checkAddedStudents.length > 0) {
          if (window.confirm(`Add all students selected ?`)) {
            let updateForm = {
              usernames: checkAddedStudents,
              courseId: courseId
            }
            let rs = await courseApi.addStudentsForCourse(updateForm).catch(data => { return data.response })
            if (await rs.status === 200) {
              dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Students added.")))
              setOpenAddStudentsModal(false)
    
              let newStudents = checkAddedStudents.map((item, index) => {
                return {
                  ...findElementByUsername(item, Students),
                  'no.': studentsAssignedRows.length + index + 1,
                  id: studentsAssignedRows.length + index
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
            return studentsAssignedRows.findIndex(itemS => itemS.username === item.username) === -1
          })
    
          tmp = tmp.map((item, index) => {
            return {
              ...item,
              'no.': index + 1,
              id: index
            }
          })
          setStudentsAddedRows([...tmp])
        }
    
      }, [Students, studentsAssignedRows])

      const CheckAddStudents = (ids) => {
        const selectedRowsData = ids.map((id) => studentsAddedRows.find((row) => row.id === id));
        let selectedRowsUsername = []
        selectedRowsData.forEach((row) =>selectedRowsUsername.push(row.username));
        setCheckAddedStudents(selectedRowsUsername)
      }
      return {CheckAddStudents, handleAddStudents, OpenAddStudentsModal, setOpenAddStudentsModal, 
    searchStudentsAddedData, setSearchStudentsAddedData, studentsAddedRows}
}

export default useAddStudents