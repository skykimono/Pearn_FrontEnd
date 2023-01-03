import { useState, useEffect } from "react";
import { useFetchAllStudentsAssigned } from "../../redux/course/hook";

const useLoadAssginedStudents = (courseId) =>{
  const AssignedStudents = useFetchAllStudentsAssigned(courseId)
    const [studentsAssignedRows, setStudentsAssignedRows] = useState([]);
    const [searchAssignedStudentsData, setSearchAssignedStudentsData] = useState([])
    useEffect(() => {
        if (AssignedStudents.length > 0 & AssignedStudents !== "false") {
          let tmp = AssignedStudents.map((item, index) => {
            return {
              ...item,
              'no.': index + 1,
              id: index
            }
          })
          setStudentsAssignedRows([...tmp])
        }
      }, [AssignedStudents])

      return {AssignedStudents, studentsAssignedRows, setStudentsAssignedRows, searchAssignedStudentsData, setSearchAssignedStudentsData};
}

export default useLoadAssginedStudents