import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import courseApi from "../../api/courseAPI";

export const fetchAllCourses = createAsyncThunk(
    'courses',
    async (data, { rejectWithValue }) => {

        const rs = await courseApi.fetchAllCourses().catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data);
        }
        return rs.data
    }
)
export const fetchAllAssignedCourses = createAsyncThunk(
    'user/fetchAllAssignedCourses',
    async (data, { rejectWithValue }) => {

        const rs = await courseApi.fetchAllAssignedCourses().catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data);
        }
        return rs.data
    }
)

const initialState = {
    courses: [],
    assignedcourses: []
}


const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        addCourses: (state, action) => {
            let course = action.payload
            let courses = state.courses

            courses.push(course)

            state.courses = courses
        },

        updateCourses: (state, action) => {
            let course = action.payload
            let courses = state.courses

            let index = courses.findIndex(item => item._id === course._id)

            courses[index] = course

            state.courses = courses
        }
        ,
        deleteCourses: (state, action) => {
            let courseId = action.payload
            let courses = state.courses

            let index = courses.findIndex(item => item._id === courseId)

            courses.splice(index, 1)

            state.courses = courses
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCourses.pending, state => {

        })
        builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
            state.courses = action.payload

        })
        builder.addCase(fetchAllCourses.rejected, (state, action) => {

        })
        builder.addCase(fetchAllAssignedCourses.pending, state => {

        })
        builder.addCase(fetchAllAssignedCourses.fulfilled, (state, action) => {
            state.assignedcourses = action.payload

        })
        builder.addCase(fetchAllAssignedCourses.rejected, (state, action) => {

        })
    }
})

export const {
    addCourses,
    updateCourses,
    deleteCourses
} = coursesSlice.actions

export default coursesSlice.reducer