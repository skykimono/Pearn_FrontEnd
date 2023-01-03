import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../../api/userAPI";

const initialState = {
    users: [],
    lecturers: [],
    students: []
}
export const fetchAllUsers = createAsyncThunk(
    '/users',
    async (data, { rejectWithValue }) => {

        const rs = await userApi.fetchAllUsers().catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data);
        }
        return rs.data
    }
)
export const fetchAllLecturers = createAsyncThunk(
    'user/fetchAllLecturers',
    async (data, { rejectWithValue }) => {

        const rs = await userApi.fetchAllLecturers().catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data);
        }
        return rs.data
    }
)
export const fetchAllStudents = createAsyncThunk(
    'user/fetchAllStudents',
    async (data, { rejectWithValue }) => {

        const rs = await userApi.fetchAllStudents().catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data);
        }
        return rs.data
    }
)


const allUsersSlice = createSlice({
    name: 'allusers',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        addUsers: (state, action) => {
            let users = state.users
            let user = action.payload

            users.push(user)

            state.users = users
        },
        deleteUsers: (state, action) => {
            let username = action.payload
            let users = state.users

            let index = users.findIndex(item => item.username === username)

            users.splice(index, 1)

            state.users = users
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, state => {

        })
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(fetchAllUsers.rejected, (state, action) => {

        })
        builder.addCase(fetchAllLecturers.pending, state => {

        })
        builder.addCase(fetchAllLecturers.fulfilled, (state, action) => {
            state.lecturers = action.payload
        })
        builder.addCase(fetchAllLecturers.rejected, (state, action) => {

        })
        builder.addCase(fetchAllStudents.pending, state => {

        })
        builder.addCase(fetchAllStudents.fulfilled, (state, action) => {
            state.students = action.payload
        })
        builder.addCase(fetchAllStudents.rejected, (state, action) => {

        })
    }
})

export const {
    setUsers,
    addUsers,
    deleteUsers
} = allUsersSlice.actions

export default allUsersSlice.reducer