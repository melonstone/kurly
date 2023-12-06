import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isServiceModal1: false
}

const confirmServiceModal1Reducer = createSlice({
    name: 'confirmService1',
    initialState: initState,
    reducers: {
        confirmService1: (state, action)=>{
            state.isServiceModal1 = action.payload
        }
    }
});

export default confirmServiceModal1Reducer.reducer;
export const {confirmService1} = confirmServiceModal1Reducer.actions;