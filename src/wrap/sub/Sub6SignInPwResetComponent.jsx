import React from 'react';
import './scss/sub6_reset.scss';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub6SignInPwResetComponent() {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // console.log(location.state.아이디);
    // console.log(location.state.휴대폰);

    // 상태관리
    const [state, setState] = React.useState({
        아이디: '',
        휴대폰: '',
        새비밀번호1: '',
        새비밀번호2: '',

        // 포커스 인: show
        guideTextBox1: false,       
        guideTextBox2: false,       

        // 포커스 인: 글자색 #333
        pw1_guide1: null,           // 포커스 아웃
        pw1_guide2: null,           // 색상 #F03F40 true
        pw1_guide3: null,           // 색상 #257CD8 false

        pw2_guide: null,

        submitBtn: true             // 위 모든 제한조건 오류가 없는 경우 false => 폼전송버튼 활성화
    });
    
    // 비밀번호 등록 입력상자 제한조건
    const pw1RegExp=(value)=>{
        let pw1_guide1 = null;
        let pw1_guide2 = null;
        let pw1_guide3 = null;

        // 가. 10자 이상 입력
        // 나. 영문/숫자/특수문자만 허용하며, 2개이상 조함
        // 다. 동일한 숫자 3개이상 연속 사용 불가
        // 공백, 한글 제외
        const regExp1 = /^(.){10,}$/g;
        const regExp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)/g;
        const regExp3 = /\s/g;
        const regExp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regExp5 = /(\d)\1\1/g;  // 숫자3자연속

        // 10자 이상 입력
        if(regExp1.test(value)===false){
            pw1_guide1 = true;
        }
        else {
            pw1_guide1 = false;
        }
        // 영문/숫자/특수문자(공백제외)만 허용하며, 2개이상 조함
        if(regExp2.test(value)===false || regExp3.test(value)===true || regExp4.test(value)===true){
            pw1_guide2 = true;
        }
        else{           
            pw1_guide2 = false;
        }
        // 동일한 숫자 3개이상 연속 사용 불가        
        if(regExp5.test(value)===true){
            pw1_guide3 = true;
        }
        else{
            pw1_guide3 = false;
        }

        setState({
            ...state,
            새비밀번호1: value,
            pw1_guide1: pw1_guide1,
            pw1_guide2: pw1_guide2,
            pw1_guide3: pw1_guide3,
        });
    }

    // 비밀번호 확인 입력상자 제한조건
    const pw2Function=(value)=>{
        let pw2_guide = null;

        if(value!==state.새비밀번호1 || value===''){
            pw2_guide = true;
        }
        else if(value===state.새비밀번호1){
            pw2_guide = false;
        }

        setState({
            ...state,
            새비밀번호2: value,
            pw2_guide: pw2_guide
        });
    }


    // 새 비밀번호 등록 변경
    // => 새 비밀번호 확인 함수가 동작
    React.useEffect(()=>{
        pw2Function(state.새비밀번호2);
        return;
    },[state.새비밀번호1]);


    // 최종 확인버튼
    React.useEffect(()=>{
        let submitBtn = false;

        if(state.pw2_guide===false){    // 입력상자 모두 정상
            submitBtn = false;
        }
        else{
            submitBtn = true;
        }
        
        setState({
            ...state,
            submitBtn: submitBtn
        })
        return;
    },[state.pw2_guide])

    
    // 비밀번호 등록 입력상자 포커스인(onFocus) 이벤트
    const onFocusPw1=(e)=>{
        setState({
            ...state,
            guideTextBox1: true
        });
    }
    // 비밀번호 등록 입력상자 포커스아웃(onBlur) 이벤트
    const onBlurPw1=()=>{
        pw1RegExp(state.새비밀번호1);
    }

    // 비밀번호 확인 입력상자 포커스인(onFocus) 이벤트
    const onFocusPw2=(e)=>{
    setState({
        ...state,
        guideTextBox2: true
    });
    }
    // 비밀번호 확인 입력상자 포커스아웃(onBlur) 이벤트
    const onBlurPw2=()=>{
        pw2Function(state.새비밀번호2);
    }

    // 아이디, 휴대폰 정보 불러오기
    React.useEffect(()=>{

        if(location.state.아이디!=='' && location.state.휴대폰!==''){
            setState({
                ...state,
                아이디: location.state.아이디,
                휴대폰: location.state.휴대폰
            })
        }

    },[])

    // 새 비밀번호 등록 => 새비밀번호1
    const onChangePw1=(e)=>{
        pw1RegExp(e.target.value);
    }
    // 새 비밀번호 확인 => 새비밀번호2
    const onChangePw2=(e)=>{
        pw2Function(e.target.value);
    }

    // 컨펌모달창 메서드
    // 리덕스 디스패쳐 컨펌모달메서드 => 반복구현
    const confirmModalMethod=(msg)=>{

        // 객체 생성
       const obj = {
            isConfirmModal: true,
            confirmMsg: msg,
            join: false
        }
        // 객체를 리듀서에 전달
        dispatch(confirmModal(obj));

        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');
    }


    // 폼전송
    const onSubmitPwreset=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('userId', state.아이디);
        formData.append('userHp', state.휴대폰);
        formData.append('userPw', state.새비밀번호1);

        axios({
            url: 'http://kyscoo.dothome.co.kr/kurly/kurly_pw_reset.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            console.log("AXIOS 성공");
            console.log(res.data);
            if(res.data===1){
                confirmModalMethod('비밀번호 변경이 완료되었습니다.');
            }
            else{
                confirmModalMethod('확인하고 다시 시도해 주세요.');
            }
        })
        .catch((err)=>{
            console.log("AXIOS 실패");
            console.log(err);
        })

    }

    // 새비밀번호 삭제
    const onClickDelPw1=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            새비밀번호1: ''
        });
    }
    // 새비밀번호확인 삭제
    const onClickDelPw2=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            새비밀번호2: ''
        });
    }

    return (
        <main id='pw-reset'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="reset-text">비밀번호 재설정</h2>
                    </div>
                    
                    <div className="content sub6_reset">
                       <form onSubmit={onSubmitPwreset} autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <label htmlFor="userPw1">새 비밀번호 등록</label>
                                        <input 
                                            type="password" 
                                            name='userPw1' 
                                            id='userPw1' 
                                            placeholder='새 비밀번호를 입력해주세요' 
                                            value={state.새비밀번호1}
                                            onChange={onChangePw1}
                                            onFocus={onFocusPw1}
                                            onBlur={onBlurPw1}
                                            maxLength={16}
                                        />
                                        {
                                            state.새비밀번호1!=='' && (
                                                <button onClick={(e)=>onClickDelPw1(e, 'pw1')} className='delBtn'>
                                                    <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                                </button>
                                            )
                                        }   
                                    </div>
                                    {
                                        state.guideTextBox1 && (
                                            <div className="guide-text-box">
                                                <p className={state.pw1_guide1===null? '' : (state.pw1_guide1===true? 'red' : 'blue')}>10자 이상 입력</p>
                                                <p className={state.pw1_guide2===null? '' : (state.pw1_guide2===true? 'red' : 'blue')}>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                                                <p className={state.pw1_guide3===null? '' : (state.pw1_guide3===true? 'red' : 'blue')}>동일한 숫자 3개 이상 연속 사용 불가</p>
                                            </div>
                                        )
                                    }
                                </li>
                                <li>
                                    <div className="gap">
                                        <label htmlFor="userPw2">새 비밀번호 확인</label>
                                        <input 
                                            type="password" 
                                            name='userPw2' 
                                            id='userPw2' 
                                            placeholder='새 비밀번호를 한번 더 입력해주세요' 
                                            value={state.새비밀번호2}
                                            onChange={onChangePw2}
                                            onFocus={onFocusPw2}
                                            onBlur={onBlurPw2}
                                        />
                                        {
                                            state.새비밀번호2!=='' && (
                                                <button onClick={(e)=>onClickDelPw2(e, 'pw2')} className='delBtn'>
                                                    <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                                </button>
                                            )
                                        }  
                                    </div>
                                    {
                                        state.guideTextBox2 && (
                                            <div className="guide-text-box">
                                                <p className={state.pw2_guide===null? '' : (state.pw2_guide===true? 'red' : 'blue')}>동일한 비밀번호를 입력해 주세요.</p>
                                            </div>
                                        )
                                    }
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="submit" 
                                            name='submitBtn' 
                                            id='submitBtn' 
                                            value={'확인'} 
                                            className={state.submitBtn===true? '' : 'on'} 
                                            disabled={state.submitBtn}
                                        />
                                    </div>
                                </li>
                            </ul>
                       </form>
                    </div>
                </div>
            </section>
        </main>
    );
};
