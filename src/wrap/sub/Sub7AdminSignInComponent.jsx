import React from 'react';
import './scss/sub6.scss';
import './scss/sub7_myadmin.scss';
// #2-3 네비게이트 임포트
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { address } from '../../reducer/address';
import { signIn } from '../../reducer/signIn';

export default function Sub7AdminSignInComponent() {

    const navigate = useNavigate();
    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();

    // 상태관리변수
    const [state, setState] = React.useState({
        아이디: '',
        비밀번호: '',
        로그인정보: {}
    });
    

    // 입력 이벤트
    const onChangeId=(e)=>{
        setState({
            ...state,
            아이디: e.target.value
        });
    }
    const onChangePw=(e)=>{
        setState({
            ...state,
            비밀번호: e.target.value
        });
    }


    // 로그인버튼 클릭 => onSubmit 폼전송 구현
    const onSubmitSignIn=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('adminId', state.아이디);
        formData.append('adminPw', state.비밀번호);

        axios({
            url: 'http://kyscoo.dothome.co.kr/kurly/green_kurly_admin_signin.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            console.log("AXIOS 전송성공");
            console.log(res.data);

            if(res.status===200){
                if(res.data!==''){
                    // 로그인 시작
                    // 3일간 로그인 유지하기
                    let toDay = new Date();
                    toDay.setDate(toDay.getDate() + 3);

                    // 상태관리 저장
                    const 로그인정보 = {
                        회원등급: '관리자',
                        아이디: res.data.아이디,
                        이름: res.data.이름,
                        주소: res.data.주소
                    }

                    // 로컬스토리지에 로그인정보 저장 => 새로고침 시에도 정보유지
                    localStorage.setItem('KURLY_SIGNIN_INFO', JSON.stringify(로그인정보));

                    
                    // 리덕스 상태관리 저장
                    dispatch(signIn(로그인정보));
                    navigate('/index');
                }
            }

        })
        .catch((err)=>{
            console.log("AXIOS 전송실패");
            console.log(err);
        })
    }


    // 내비게이트 이벤트
    const onClickId=(e)=>{
        e.preventDefault();
        navigate('/sub7AdminIdSearch');  // 경로설정
    }
    const onClickPw=(e)=>{
        e.preventDefault();
        navigate('/sub7AdminPwSearch');
    }
    const onClickSignUp=(e)=>{
        e.preventDefault();
        navigate('/sub7AdminSignUp');
    }

    
    return (
        // #1 로그인 기본 폼 만들기
        // 입력상자로 버튼을 만들 수 있다 => gap 제일 아래 2가지
        // 로그인 버튼  => 데이터 바인딩
        // 회원가입버튼 => 인트로페이지로 이동
        <main id='sub6' className='sub7-myadmin'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="title_text">MyAdmin</h2>
                        <h3 className="title_text">로그인</h3>
                    </div>
                    
                    <div className="content sub6_content">
                       <form onSubmit={onSubmitSignIn} autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="text" 
                                            name='adminId' 
                                            id='adminId' 
                                            placeholder='아이디를 입력해주세요' 
                                            onChange={onChangeId}
                                            value={state.아이디}
                                            style={{backgroundColor:'#fcfcfc'}}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="password" 
                                            name='adminPw' 
                                            id='adminPw' 
                                            placeholder='비밀번호를 입력해주세요' 
                                            autoComplete='off'
                                            onChange={onChangePw}
                                            value={state.비밀번호}
                                            style={{backgroundColor:'#fcfcfc'}}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <span>
                                            <a onClick={onClickId} href="!#">아이디 찾기</a>
                                            <i>|</i>
                                            <a onClick={onClickPw} href="!#">비밀번호 찾기</a>
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input type="submit" name='submitBtn' id='submitBtn' value={'로그인'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input type="button" name='signInBtn' id='signInBtn' value={'회원가입'} onClick={onClickSignUp}/>
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
