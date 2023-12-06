import React from 'react';
import './scss/sub6.scss';
import { useNavigate, useLocation } from 'react-router-dom';
// #3 #2번은 네비게이트, #3번은 링크로 아이디찾기, 비밀번호 찾기 페이지 이동 구현해보기

export default function Sub7AdminResultComponent() {

    const navigate = useNavigate();
    const location = useLocation();

    const onClickPwSearch=(e)=>{
        e.preventDefault();
        
        navigate('/sub7AdminPwSearch');
    }

    const onClickSignIn=(e)=>{
        e.preventDefault();
        
        navigate('/sub7AdminSignIn');
    }


    return (
        <main id='sub6' className='sub6-search-result'>
            <section id="section1">
                <div className="container">
                    <div className="title search-title">
                        <h2>관리자님의 컬리 계정을 찾았습니다.</h2>
                        <h3>아이디 확인 후 로그인해 주세요.</h3>
                    </div>
                    
                    <div className="content sub6_content">
                       <form>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <div className="text-box">
                                            <div className="left">
                                                <img src="./images/sub/sub6/icon_person.svg" alt="" />
                                            </div>
                                            <div className="right">
                                                <p>{location.state.아이디}</p>
                                                <p>{location.state.가입일}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input onClick={onClickPwSearch} type="button" name='pwSearchBtn' id='pwSearchBtn' value={'비밀번호 찾기'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input onClick={onClickSignIn} type="button" name='signInBtn2' id='signInBtn2' value={'로그인'} />
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
