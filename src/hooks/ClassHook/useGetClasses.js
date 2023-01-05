import { useCourses, useFetchAllCourses } from '../../redux/course/hook';
import { useEffect, useState } from 'react';


const useGetClasses = () => {
    useFetchAllCourses();
    const Courses = useCourses();
    const [assignedCourses, setAssignedCourses] = useState([])
    useEffect(() => {
        if (Courses.length > 0) {
            setAssignedCourses([...Courses])
        }
    }, [Courses])

    return {assignedCourses}
}

export default useGetClasses