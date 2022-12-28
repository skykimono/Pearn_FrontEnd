import { useAssignedCourses, useFetchAllAssignedCourses } from '../../redux/course/hook';
import { useEffect, useState } from 'react';


const useGetClasses = () => {
    useFetchAllAssignedCourses()
    const AssignedCourses = useAssignedCourses()
    const [assignedCourses, setAssignedCourses] = useState([])
    useEffect(() => {
        if (AssignedCourses.length > 0) {
            setAssignedCourses([...AssignedCourses])
        }
    }, [AssignedCourses])

    return {assignedCourses}
}

export default useGetClasses