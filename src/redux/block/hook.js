import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAllBlocks, fetchBlock } from './blocksSlice'
import blockApi from '../../api/blockAPI'





export const useBlocks = () => useSelector((state) => state.blocksState.blocks)
export const useBlock = () => useSelector((state) => state.blockState.block)

export const useFetchAllBlocks = (data,change) => {
    const [result, setResult] = useState([])
    const fetch = async () => {

        const rs = await blockApi.fetchAllBlocks(data).catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            setResult("false")
            return
        }
        setResult(rs.data)

    }

    useEffect(() => {
        fetch()
    }, [change])

    return result
}

export const useFetchBlock = (data) =>{
    const [result, setResult] = useState({})

    const fetch = async () => {

        const rs = await blockApi.fetchBlock(data).catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            setResult("false")
            return
        }
        setResult(rs.data)

    }

    useEffect(() => {
       fetch()
    }, [])

    return result
}

export const useGetSubmissions = (id, change) =>{
    const [result, setResult] = useState([])
    const fetch = async () => {

        const rs = await blockApi.getBlockSubmissions(id).catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            setResult("false")
            return
        }
        setResult(rs.data)

    }

    useEffect(() => {
        fetch()
    }, [change])

    return result
}

export const useFetchSubmission = (id, change) =>{
    const [result, setResult] = useState([])
    const fetch = async () => {

        const rs = await blockApi.getSubmission(id).catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            setResult("false")
            return
        }
        setResult(rs.data)

    }

    useEffect(() => {
        fetch()
    }, [change])

    return result
}

export const useFetchAverageScore = (id, change) =>{
    const [result, setResult] = useState([])
    const fetch = async () => {

        const rs = await blockApi.getAverageScore(id).catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            setResult("false")
            return
        }
        setResult(rs.data)

    }

    useEffect(() => {
        fetch()
    }, [change])

    return result
}

export const useGetBlockWeight = (id, change) =>{
    const [weight, setWeight] = useState([])
    const fetch = async () => {

        const rs = await blockApi.getWeight(id).catch(data => { return data.response })
        console.log(rs.data)

        if (rs.status < 200 || rs.status >= 300) {
            setWeight("false")
            return
        }
        setWeight(rs.data)

    }

    useEffect(() => {
        fetch()
    }, [change])

    console.log(weight)

    return {weight, setWeight}
}

export const useGetMySubmit = (id, change) =>{
    const [submit, setSubmit] = useState('')
    const fetch = async () => {

        const rs = await blockApi.getMySubmit(id).catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            setSubmit("")
            return
        }
        setSubmit(rs.data.submission)

    }

    useEffect(() => {
        fetch()
    }, [change])


    return {submit, setSubmit}
}

export const useFetchComments = (id, change) =>{
    const [Comments, setComments] = useState([])
    const fetch = async () => {

        const rs = await blockApi.getAllComments(id).catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            setComments([])
            return
        }
        setComments(rs.data)

    }

    useEffect(() => {
        fetch()
    }, [change])

    return {Comments, setComments}
}
