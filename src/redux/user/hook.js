import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { login } from './userSlice'

export const useUserState = () => useSelector((state) => state.userState)


export const useUserLogin = (data) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(login(data))
    }, [])

}