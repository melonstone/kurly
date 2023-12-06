import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isServiceModal3: false
}

const confirmServiceModal3Reducer = createSlice({
    name: 'confirmService3',
    initialState: initState,
    reducers: {
        confirmService3: (state, action)=>{
            state.isServiceModal3 = action.payload
        }
    }
});

export default confirmServiceModal3Reducer.reducer;
export const {confirmService3} = confirmServiceModal3Reducer.actions;