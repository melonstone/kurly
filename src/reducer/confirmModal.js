import { createSlice } from "@reduxjs/toolkit";


const initState = {
    isConfirmModal: false,
    confirmMsg: '',
    join: false
}

const confirmModalReducer = createSlice({
    name: 'confirmModal',
    initialState: initState,
    reducers: {
        confirmModal: (state, action)=>{    // 메서드 => 값만 들어오게 구현
            // console.log(action);
            // console.log(action.payload);
            
            state.isConfirmModal = action.payload.isConfirmModal;
            state.confirmMsg = action.payload.confirmMsg;
            state.join =  action.payload.join;
        }
    }
});

export default confirmModalReducer.reducer;
export const {confirmModal} = confirmModalReducer.actions;