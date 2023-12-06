import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isServiceModal2: false
}

const confirmServiceModal2Reducer = createSlice({
    name: 'confirmService2',
    initialState: initState,
    reducers: {
        confirmService2: (state, action)=>{
            state.isServiceModal2 = action.payload
        }
    }
});

export default confirmServiceModal2Reducer.reducer;
export const {confirmService2} = confirmServiceModal2Reducer.actions;