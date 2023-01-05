import { useCourses, useFetchAllCourses } from "../../redux/course/hook";
import { useState, useEffect } from "react";
import { findElementById } from '../../utils/uitility';



const useGetCourseName = (courseId) =>{
    useFetchAllCourses();
    const Courses = useCourses();
    const [course, setCourse] = useState({})

    useEffect(() => {
        if (Courses.length > 0) {
          let tmp = findElementById(courseId, Courses)
          setCourse({ ...tmp })
        }
      }, [Courses, courseId])


      return {course};
}

export default useGetCourseName