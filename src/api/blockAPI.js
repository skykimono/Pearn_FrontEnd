import axiosClient from "./axiosClient"

const blockApi = {
    updateBlock: (body, id) => {
        const url = `/block/${id}`
        return axiosClient.patch(url, { ...body })
    },
    createBlock: (body) =>{
        const url = `/block/markdown`
        return axiosClient.post(url,{...body})
    },
    deleteBlock: (id) =>{
        const url = `/block/${id}`
        return axiosClient.delete(url)
    },
    fetchAllBlocks: (id) =>{
        const url = `/block/blocks/${id}`
        return axiosClient.get(url)
    },
    fetchBlock: (id) =>{
        const url = `/block/${id}`
        return axiosClient.get(url)
    },
    updateBlockContent: (body, id) =>{
        const url = `/block/markdown/${id}`
        return axiosClient.patch(url, {...body})
    },
    getBlockSubmissions: (id) =>{
        const url = `/score/submits/${id}`
        return axiosClient.get(url)
    },
    submitScore: (body, id) =>{
        const url = `/score/${id}`
        return axiosClient.post(url, {...body})
    },
    getSubmission: (id) =>{
        const url = `/score/submit/${id}`
        return axiosClient.get(url)
    },
    submitExercise: (body, id) =>{
        const url = `/score/submit/${id}`
        return axiosClient.post(url, {...body})
    },
    getAverageScore: (id) =>{
        const url = `/score/sumAll/${id}`
        return axiosClient.get(url)
    },
    getWeight: (id) =>{
        const url = `/score/weight/${id}`
        return axiosClient.get(url)
    },
    setWeight: (body, id) =>{
        const trimedId = id.trim();
        const url = `/score/weight/${trimedId}`
        return axiosClient.patch(url, {...body})
    },
    getMySubmit: (id) =>{
        const url = `/score/mySubmit/${id}`
        return axiosClient.get(url)
    },
    getAllComments: (id) =>{
        const url = `/block/comments/${id}`
        return axiosClient.get(url)
    },
    postComments: (body, id) =>{
        const url = `/block/comment/${id}`
        return axiosClient.post(url, {...body})
    },
    deleteComments: (id) =>{
        const url = `/block/comment/${id}`
        return axiosClient.delete(url)
    }
}

export default blockApi