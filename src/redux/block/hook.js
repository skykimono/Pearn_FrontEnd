import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAllBlocks } from './blocksSlice'
import blockApi from '../../api/blockAPI'





export const useBlocks = () => useSelector((state) => state.blocksState.blocks)


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

