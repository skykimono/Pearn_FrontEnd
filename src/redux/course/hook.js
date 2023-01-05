import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAllAssignedCourses, fetchAllCourses } from './coursesSlice'
import courseApi from '../../api/courseAPI'



export const useCourses = () => useSelector((state) => state.coursesState.courses)
export const useAssignedCourses = () => useSelector((state) => state.coursesState.assignedcourses)

export const useFetchAllCourses = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllCourses())
    }, [])
}
export const useFetchAllAssignedCourses = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllAssignedCourses())
    }, [])
}
export const useFetchAllStudentsAssigned = (id) => {
    const [result, setResult] = useState([])
    const fetch = async () => {
        const rs = await courseApi.fetchAllStudentsAssigned(id).catch(data => { return data.response })
        if (rs.status < 200 || rs.status >= 300) {
            setResult("false")
            return
        }
        setResult(rs.data.students)

    }
    useEffect(() => {
        fetch()
    }, [])
    return result
} 

export const useFetchAverageStar = (id) => {
    const [rating, setRating] = useState([])
    const fetch = async () => {
        const rs = await courseApi.getAverageStar(id).catch(data => { return data.response })
        console.log(rs.data)
        if (rs.status < 200 || rs.status >= 300) {
            setRating('')
            return
        }
        setRating(rs.data[0].stars)

    }
    useEffect(() => {
        fetch()
    }, [])
    console.log(rating)
    return {rating, setRating}
}   
