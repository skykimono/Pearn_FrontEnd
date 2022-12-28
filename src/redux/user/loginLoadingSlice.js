import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: false
}

export const loginLoadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.value = action.payload
        },
        removeLoading: (state) => {
            state.value = false
        }
    }
})
export const { setLoading, removeLoading } = loginLoadingSlice.actions
export default loginLoadingSlice.reducer