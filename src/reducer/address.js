// 리듀서 객체(Object) 생성하기
import { createSlice } from "@reduxjs/toolkit";


const initState = {
    주소: ''
}


const addressReducer = createSlice({
    name: 'address',
    initialState: initState,
    reducers: {
        // 즉시표현함수
        address: (state, action)=>{
            state.주소 = action.payload;
        }
    }
});

// 내보내기
export default addressReducer.reducer;
export const {address} = addressReducer.actions;   // 비구조화