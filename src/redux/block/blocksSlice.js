import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blockApi from "../../api/blockAPI";



export const fetchAllBlocks = createAsyncThunk(
    'user/fetchAllBlocks',
    async (data, { rejectWithValue }) => {

        const rs = await blockApi.fetchAllBlocks(data).catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data);
        }
        return rs.data
    }
)

const initialState = {
    blocks: []
}


const blocksSlice = createSlice({
    name: 'blocks',
    initialState,
    reducers: {
        // addCourses: (state, action) => {
        //     let course = action.payload
        //     let courses = state.courses

        //     courses.push(course)

        //     state.courses = courses
        // },

        // updateCourses: (state, action) => {
        //     let course = action.payload
        //     let courses = state.courses

        //     let index = courses.findIndex(item => item.id === course.id)

        //     courses[index] = course

        //     state.courses = courses
        // }
        // ,
        // deleteCourses: (state, action) => {
        //     let course = action.payload
        //     let courses = state.courses

        //     let index = courses.findIndex(item => item.id === course.id)

        //     courses.splice(index, 1)

        //     state.courses = courses
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllBlocks.pending, state => {

        })
        builder.addCase(fetchAllBlocks.fulfilled, (state, action) => {
            state.courses = action.payload

        })
        builder.addCase(fetchAllBlocks.rejected, (state, action) => {

        })

    }
})

export const {

} = blocksSlice.actions

export default blocksSlice.reducer