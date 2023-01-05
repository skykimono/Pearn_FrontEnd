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