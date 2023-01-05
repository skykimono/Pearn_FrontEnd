import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blockApi from "../../api/blockAPI";

export const fetchBlock = createAsyncThunk(
    '/block',
    async (data, { rejectWithValue }) => {

        const rs = await blockApi.fetchBlock(data).catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data);
        }
        return rs.data
    }
)

const initialState = {
    block: {}
}


const blockSlice = createSlice({
    name: 'block',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBlock.pending, state => {

        })
        builder.addCase(fetchBlock.fulfilled, (state, action) => {
            state.block = action.payload

        })
        builder.addCase(fetchBlock.rejected, (state, action) => {

        })

    }
})

export const {

} = blockSlice.actions

export default blockSlice.reducer