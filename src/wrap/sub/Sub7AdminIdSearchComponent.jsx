import React from 'react';
import './scss/sub6id_pw_search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// #2 아이디찾기 파일 및 폼 만들기
export default function Sub7AdminIdSearchComponent(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    
    const [state, setState] = React.useState ({
        // #4-1 탭메뉴 상태변수 등록
        isHp: true,
        isEmail: false,

        // #4-4 입력상자 = onChange이벤트 상태변수 등록
        이름:'',
        휴대폰:'',
        발급인증번호: null,
        입력인증번호: '',
        아이디: '',
        가입일: '',

        이메일: '',
        isGuideTextName: false,
        isGuideTextHp: '',
        isGuideTextEmail: '',
        isOff: false,
        isOff2: false,

        // 인증번호 박스
        isHpAuthenBox: false,
        isEmailAuthenBox: false,
        
    });

    // 타임카운트 상태변수 관리
    const [count, setCount] = React.useState({
        M: 0,
        S: 0,
        // 인증번호 발송
        setId: 0
    });

    // 이름 input상자 이벤트
    const onChangeName=(e)=>{
        let isGuideTextName = false;

        if(e.target.value===''){
            isGuideTextName = true;
        }
        else{
            isGuideTextName = false;
        }
        
        setState({
            ...state,
            이름: e.target.value,
            isGuideTextName: isGuideTextName
        })
    }

    // 휴대폰 input상자 이벤트
    const onChangeHp=(e)=>{
        const regExp1 = /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/g;
        const regExp2 = /[^\d]/g;   // 숫자가 아니면 삭제
        
        let 휴대폰 = '';
        let isGuideTextHp = false;

        휴대폰 = e.target.value.replace(regExp2, '');

        if(휴대폰===''){
            isGuideTextHp = '가입 시 등록한 휴대폰 번호를 입력해 주세요';
        }
        else if (regExp1.test(휴대폰)===false){
            isGuideTextHp = '휴대폰 번호를 정확히 입력해 주세요';
        }
        else{
            isGuideTextHp = '';
        }

        setState({
            ...state,
            휴대폰: 휴대폰,
            isGuideTextHp: isGuideTextHp
        });
    }

    // 이메일 input상자 이벤트
    const onChangeEmail=(e)=>{
        let isGuideTextEmail = '';
        let 이메일= e.target.value;

        const regExp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        
        if(이메일===''){
            isGuideTextEmail = '가입 시 등록한 이메일을 입력해 주세요.';
        }
        else if(regExp.test(이메일)===false){
            isGuideTextEmail = '올바른 이메일 형식을 입력해 주세요.';
        }
        else{
            isGuideTextEmail = '';
        }

        setState({
            ...state,
            이메일: 이메일,
            isGuideTextEmail: isGuideTextEmail
        });
    }

    // 이름 삭제
    const onClickDelName=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            이름: ''
        });
    }

    // 휴대폰번호 삭제
    const onClickDelHp=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            휴대폰: ''
        });
    }

    // 이메일 삭제
    const onClickDelEmail=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            이메일: ''
        });
    }
    
    // 이름, 휴대폰 입력이 완료되면 동작하는 이벤트
    React.useEffect(()=>{
        let isOff = false;
        const regExp1 = /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/g;

        if(state.이름!=='' && regExp1.test(state.휴대폰)===true){
            isOff = true;
        }
        else{
            isOff = false;
        }

        setState({
            ...state,
            isOff: isOff
        });

        return;     // 한 번만 실행하게 함

    },[state.이름,state.휴대폰])

    // 이름, 이메일 입력이 완료되면 동작하는 이벤트
    React.useEffect(()=>{
        let isOff2 = false;
        const regExp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;

        if(state.이름!=='' && regExp.test(state.이메일)===true){
            isOff2 = true;
        }
        else{
            isOff2 = false;
        }

        setState({
            ...state,
            isOff2: isOff2
        });

        return;     // 한 번만 실행하게 함

    },[state.이름,state.이메일])

    // 탭버튼 클릭이벤트
    const onClickTap=(e, p)=>{
        e.preventDefault();
        let isHp = true;
        let isEmail = false;

        if(p==='휴대폰인증'){
            isHp = true;
            isEmail = false;
        }
        else if(p==='이메일인증'){
            isHp = false;
            isEmail = true;
        }

        setState({
            ...state,
            isHp: isHp,
            isEmail: isEmail
        });

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

    // 3분 카운트 메서드
    const timer3MinutesCount=()=>{
        let T = 3;  // 변수 시간 3분
        let M = 0;  // 분 변수 Minutes
        let S = 0;  // 초 변수 Seconds
        let now = new Date();  // 현재 날짜, 시간
        let endTime = now.setMinutes( now.getMinutes()+T );     // 현재 시간에서 분 추출 + 변수시간

        let setId = 0;
        // 1초에 한번씩 현재날짜시간을 가져와서 endTime - 현재시간
        // 인증번호 재발송 시 전에 있던 메모리 제거 후 동작하게 구현
        clearInterval(count.setId);
        setId = setInterval(()=>{
            now = new Date();
            const result = endTime - now;

            if( now >= endTime ){
                clearInterval(setId);   // setInterval 종료
                M = 0;
                S = 0;
            }
            else{
                M = Math.floor(result/(60*1000)) % 3;       // 타임스트링 남은 분
                S = Math.floor(result/(1000)) % 60;         // 타임스트링 남은 초
            }

            setCount({
                ...count,
                M: M<10? `0${M}` : M,
                S: S<10? `0${S}` : S,
                setId: setId
            });

        },1000);
        
    }

    // 휴대폰인증 인증번호 받기
    const onSubmitHpAuthen=(e)=>{
        e.preventDefault();

        const regExp = /(^01[0-9]{1})([0-9]{3,4})([0-9]{4}$)/g;
        
        const formData = new FormData();
        formData.append('adminName', state.이름);
        formData.append('adminHp', state.휴대폰.replace(regExp, '$1-$2-$3'));

        axios({
            url: 'http://kyscoo.dothome.co.kr/kurly/green_kurly_admin_id_search.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            console.log('AXIOS 전송성공!');
            if(res.data===''){
                confirmModalMethod('가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해 주세요.');
            }
            else{
                console.log(res.data);
                let num = 0;
        
                num = Math.floor(Math.random() * 9000000 + 1000000);
                if(regExp.test(state.휴대폰)===false){
                    confirmModalMethod('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');             
                }
                else{
                    confirmModalMethod(`${num}\n 인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해 주세요.\n\n카카오톡이 설치된 경우 카카오 알림톡으로 발송됩니다.`);

                    
                    setState({
                        ...state,
                        발급인증번호: num,
                        isHpAuthenBox: true
                    });
                    
                    // 타이머 시작: 3분 카운트
                    clearInterval(count.setId);
                    timer3MinutesCount();
                }
    
                setState({
                    ...state,
                    발급인증번호: num,
                    isHpAuthenBox: true,
                    아이디: res.data.아이디,
                    가입일: res.data.가입일
                });
                    
                
                
            }
            // http://localhost:3000/sub6Result
        })
        .catch((err)=>{
            console.log('AXIOS 전송실패!');
            console.log(err);
        });

        // 인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해 주세요.
        // 카카오톡이 설치된 경우 카카오 알림톡으로 발송됩니다.


    }


    // 인증번호 확인 입력상자
    const onChangeAuthenNum=(e)=>{
        setState({
            ...state,
            입력인증번호: e.target.value
        });
    }

    // 확인버튼
    const onClickOkBtn=(e)=>{
        e.preventDefault();
        if(Number(state.입력인증번호)===Number(state.발급인증번호)){
            // 발급된 인증번호와 입력한 인증번호 비교 => 맞다면 결과창으로 이동
            // navigate(/pathName, {state: {아이디: res.data.아이디, 가입일: res.data.가입일}})
            navigate('/sub7AdminResult', {
                state: {
                    아이디: state.아이디, 
                    가입일: state.가입일
                }
            });
        }
        else{
            confirmModalMethod('인증번호가 일치하지 않습니다.');
        }
    }

    // 이메일인증 인증번호 받기
    const onSubmitEamilAuthen=(e)=>{
        e.preventDefault();
        
    }

    return (
        <main id='sub6' className='id_pw_search'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="title_text">MyAdmin</h2>
                        <h2 className="title_text">아이디찾기</h2>
                    </div>
                    
                    <div className="content">
                        {/* 
                            #4 탭메뉴 구현하기
                             - div 박스안에 탭버튼 만들기
                        */}
                        <div className="tap_button_box">
                            {/* onClick이벤트 => 같은 기능이므로 매개변수 받아서 구현 */}
                            <button onClick={(e)=>onClickTap(e, '휴대폰인증')} className={state.isHp===true? 'on' : ''}>휴대폰 인증</button>
                            <button onClick={(e)=>onClickTap(e, '이메일인증')} className={state.isEmail===true? 'on' : ''}>이메일 인증</button>
                        </div>

                       {
                        state.isHp && (
                            // autoComplete='off' => 폼의 자동완성 기능을 해제 = 이전에 썼던 기능을 해제 => 다시 자동완성 사용할때는 off대신 on
                            <form onSubmit={onSubmitHpAuthen} id='hpAuthen' autoComplete='off'>
                                <ul>
                                    <li>
                                        <div className="gap">
                                            <label htmlFor="adminName">이름</label>
                                            <input 
                                                type="text" 
                                                name='adminName' 
                                                id='adminName' 
                                                placeholder='이름을 입력해주세요' 
                                                onChange={onChangeName}
                                                value={state.이름} 
                                            />
                                            {/* 
                                                #4-3
                                                x버튼 클릭하면 입력한 데이터 지욱
                                                입력상자 = onChange이벤트
                                                value={state.이름} onChange={onChangeName}
                                                value와 onChange는 셋트
                                            */}
                                            {
                                                state.이름!=='' && (
                                                    <button onClick={onClickDelName} className='delBtn'>
                                                        <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                                    </button>
                                                )
                                            }
                                        </div>
                                            <p className={`guide-text${state.isGuideTextName===true? ' on' : ''}`}>가입 시 등록한 이름을 입력해 주세요.</p>
                                    </li>
                                    <li>
                                        <div className="gap">
                                            <label htmlFor="adminHp">휴대폰 번호</label>
                                            <input 
                                                type="text" 
                                                name='adminHp' 
                                                id='adminHp' 
                                                placeholder='휴대폰 번호를 입력해주세요' 
                                                value={state.휴대폰} 
                                                onChange={onChangeHp}
                                                maxLength={11}
                                            />
                                            {
                                                state.휴대폰!=='' && (
                                                    <button onClick={onClickDelHp} className='delBtn'>
                                                        <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                                    </button>
                                                )
                                            }
                                        </div>
                                        <p className={`guide-text${state.isGuideTextHp!==''? ' on' : ''}`}>{state.isGuideTextHp}</p>
                                    </li>
                                    {
                                        state.isHpAuthenBox && (
                                            <li>
                                                <div className="gap authen-number">
                                                    <label htmlFor="adminAuthenNum">인증번호</label>
                                                    <div className="box">
                                                        <input 
                                                            type="text" 
                                                            name='adminAuthenNum' 
                                                            id='adminAuthenNum' 
                                                            placeholder='인증번호 7자리' 
                                                            value={state.입력인증번호} 
                                                            onChange={onChangeAuthenNum}
                                                            maxLength={7}
                                                        />
                                                        <button onClick={onSubmitHpAuthen}>재발송</button>
                                                    </div>
                                                    <span className='time-box'><em>{count.M}:</em><em>{count.S}</em></span>
                                                </div>
                                                <p className={`guide-text${state.isGuideTextHp!==''? ' on' : ''}`}>{state.isGuideTextHp}</p>
                                            </li>
                                        )
                                    }
                                    {
                                        state.발급인증번호===null && (
                                            <li>
                                                <div className="gap">
                                                    {/* 
                                                        #4-2
                                                        className='off' : 인증받기 전에는 사용금지
                                                        disabled={true} : 클릭을 못하게 방지

                                                    */}
                                                    <input type="submit" name='submitBtn' id='submitBtn' value={'인증번호받기'} className={state.isOff? '' : 'off'} disabled={!state.isOff}/>
                                                </div>
                                            </li>
                                        )
                                    }
                                    {
                                        state.발급인증번호!==null && (
                                            <li>
                                                <div className="gap">
                                                    <input 
                                                        onClick={onClickOkBtn}
                                                        type="button" 
                                                        name='okBtn' 
                                                        id='okBtn' 
                                                        value={'확인'} 
                                                        className={state.isOff? '' : 'off'} 
                                                        disabled={!state.isOff}
                                                    />
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </form>
                        )
                       }

                       {
                        state.isEmail && (
                            // autoComplete='off' => 폼의 자동완성 기능을 해제 = 이전에 썼던 기능을 해제 => 다시 자동완성 사용할때는 off대신 on
                            <form onSubmit={onSubmitEamilAuthen} id='emailAuthen' autoComplete='off'>
                                <ul>
                                    <li>
                                        <div className="gap">
                                            <label htmlFor="adminName">이름</label>
                                            <input 
                                                type="text" 
                                                name='adminName' 
                                                id='adminName' 
                                                placeholder='이름을 입력해주세요' 
                                                onChange={onChangeName}
                                                value={state.이름} 
                                            />
                                            {
                                                state.이름!=='' && (
                                                    <button onClick={onClickDelName} className='delBtn'>
                                                        <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                                    </button>
                                                )
                                            }
                                        </div>
                                        <p className={`guide-text${state.isGuideTextName===true? ' on' : ''}`}>가입 시 등록한 이름을 입력해 주세요.</p>
                                    </li>
                                    <li>
                                        <div className="gap">
                                            <label htmlFor="adminName">이메일</label>
                                            <input 
                                                type="text" 
                                                name='adminEamil' 
                                                id='adminEamil' 
                                                placeholder='이메일을 입력해주세요' 
                                                onChange={onChangeEmail}
                                                value={state.이메일} 
                                            />
                                            {
                                                state.이메일!=='' && (
                                                    <button onClick={onClickDelEmail} className='delBtn'>
                                                        <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                                    </button>
                                                )
                                            }
                                        </div>
                                        <p className={`guide-text${state.isGuideTextEmail!==''? ' on' : ''}`}>{state.isGuideTextEmail}</p>
                                    </li>
                                    <li>
                                        <div className="gap">
                                        <input type="submit" name='submitBtn' id='submitBtn' value={'확인'} className={state.isOff2? '' : 'off'} disabled={!state.isOff2}/>
                                        </div>
                                    </li>
                                </ul>
                        </form>
                        )
                       }
                    </div>
                </div>
            </section>
        </main>
    );
};
