import axiosClient from "./axiosClient"

const blockApi = {
    updateBlock: (body) => {
        const url = `/api/courses/block/update-block`
        return axiosClient.patch(url, { ...body })
    },
    createBlock: (body) =>{
        const url = `/api/courses/block/create-block/`
        return axiosClient.post(url,{...body})
    },
    deleteBlock: (id) =>{
        const url = `/api/courses/block/delete-block/${id}`
        return axiosClient.delete(url)
    },
    fetchAllBlocks: (id) =>{
        const url = `/api/courses/block/${id}`
        return axiosClient.get(url)
    }
}

export default blockApi