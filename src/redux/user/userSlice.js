import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userAPI";

const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null
const token = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')) : null


export const login = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {

        const rs = await userApi.login(data)
        const res_data = await rs.data

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(res_data);
        }
        return res_data
    }
)
export const register = createAsyncThunk(
    'user/register',
    async (data, { rejectWithValue }) => {

        const rs = await userApi.register(data)
        const res_data = await rs.data

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(res_data);
        }
        return res_data
    }
)
export const editUser = createAsyncThunk(
    'user/edituser',
    async (data, { rejectWithValue }) => {

        const rs = await userApi.editUser(data.id,data.body)
        const res_data = await rs.data

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(res_data);
        }
        return res_data
    }
)
const initialState = {
    loading: false,
    user: user,
    token: token,
    err: "",
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, state => {
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false

            state.user = action.payload.user
            state.token = action.payload.token

            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('token', JSON.stringify(action.payload.token))
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.err = action.payload.message
        })
        builder.addCase(register.pending, state => {
            state.loading = true;
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.err = action.payload.message
        })
        
    }
})

export const {
    setToken,
    setUser
} = userSlice.actions

export default userSlice.reducer