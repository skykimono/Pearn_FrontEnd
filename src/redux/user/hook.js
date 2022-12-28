import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUser } from './userSlice'
import { fetchAllLecturers, fetchAllStudents, fetchAllUsers } from './allUsersSlice'


export const useUserState = () => useSelector((state) => state.userState)
export const useUserStateValue = () => useSelector((state) => state.userState.value)
export const useUsers = () => useSelector((state) => state.allUsersState.users)
export const useRole = () => useSelector((state) => state.userState.user.role)
export const useLecturers = () => useSelector((state) => state.allUsersState.lecturers)
export const useStudents = () => useSelector((state) => state.allUsersState.students)

export const useFetchAllUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])
}
export const useFetchAllLecturers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllLecturers())
    }, [])
}
export const useFetchAllStudents = () => {
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllStudents())
    }, [])
}

export const useFetchUser = () => {
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

}