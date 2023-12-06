import React from "react";
import './scss/Header.scss';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { isAddress } from "../reducer/isAddress";
import { signIn } from "../reducer/signIn";
import { address } from "../reducer/address";

export default  function HeaderComponent(){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const location = useLocation();
    const navigate = useNavigate();

    console.log(selector.signIn.로그인정보);


    const row3 = React.useRef(); // 선택자 선언

    // 리액트.유즈스테이트 훅(상태관리)
    const [state, setState] = React.useState({
        isBar: false,
        is고객센터: false,
        isFixed: false,
        is배송지등록: false,   // 배송지 등록 툴팁메뉴
        signInTooltip: false
    });


    // 로그아웃 이벤트
    const onClickLogOut=(e)=>{
        e.preventDefault();

        // 로그인정보 지우기 => null로 만들기
        // 리덕스에서 삭제 => 동기화 진행
        dispatch(signIn(null)); 
        dispatch(address(''));

        // 스토리지에 등록된 로그인정보 삭제
        localStorage.removeItem('KURLY_SIGNIN_INFO');
        sessionStorage.removeItem('KURLY_ADDRESS_KEY');

        // 메인페이지로 이동
        navigate('/index');
        
    }


    // 윈도우스크롤 이벤트
    // 자바스크립트 일반코딩
    // window  resize()  window  scroll()
    // 리액트.유즈이펙트 훅
    // React.useEffect();
    // React.useEffect(()=>{});
    React.useEffect(()=>{

        let row3Top = row3.current.offsetTop+42; // 100+42(탑모달높이)
        // console.log('row3Top ' + row3Top );
        // 스크롤이벤트
        // window.addEventListener();
        // window.addEventListener('scroll', function(){});
        window.addEventListener('scroll', function(){
            if(window.scrollY>=row3Top){
                setState({
                    ...state,
                    isFixed: true
                });
            }
            else {
                setState({
                    ...state,
                    isFixed: false
                });
            }
        });
    },[]);


    // 헤더영역 1행
    const onMouseEnterCustomer=()=>{
        setState({
            is고객센터: true
        })
    }
    const onMouseLeaveCustomer=()=>{
        setState({
            is고객센터: false
        })
    }

    // 헤더영역 3행 
    // 3Bar 이벤트
    // 마우스오버 onMouseOver  => onMouseEnter 사용권장
    const onMouseEnterIsBar=()=>{
        setState({
            isBar: true
        });
    }
    // 마우스아웃(리브) onMouseOut => onMouseLeave 사용권장
    const onMouseLeaveIsBar=()=>{
        setState({
            isBar: false
        });
    }

    // 배송지등록 마우스 엔터 이벤트
    const onMouseEnterMap=()=>{
        setState({
            ...state,
            is배송지등록: true
        })
    }
    // 배송지등록 마우스 리브 이벤트
    const onMouseLeaveMap=()=>{
        setState({
            ...state,
            is배송지등록: false
        })
    }
    // 배송지 등록 및 변경 클릭 이벤트
    const onClickAddressUpdate=(e)=>{
        e.preventDefault();

        dispatch(isAddress(true));
    }

    // 툴팁박스 마우스엔터 이벤트
    const onMouseEnterSignIn=()=>{
        setState({
            ...state,
            signInTooltip: true
        });
    }
    // 툴팁박스 마우스리브 이벤트
    // 마우스 히트영역: signIn-box
    const onMouseLeaveSignIn=()=>{
        setState({
            ...state,
            signInTooltip: false
        });
    }


    return(
        <>
            <header id="header">
                <div className="row1 row">
                    <div className="container">
                        <div className="content">
                            <aside id="aside">
                                {
                                    selector.signIn.로그인정보===null && (
                                        <>
                                            <Link to="/sub5" className="on">회원가입</Link>
                                            <i>|</i>                            
                                            <Link to="/sub6">로그인</Link>
                                        </>
                                    )
                                }
                                {
                                    selector.signIn.로그인정보!==null && (
                                        <>
                                            <div className="signIn-box" onMouseLeave={onMouseLeaveSignIn}>
                                                <Link to="/sub6" className="sign on" onMouseEnter={onMouseEnterSignIn} >
                                                    <span>{selector.signIn.로그인정보.회원등급}</span>
                                                    <span>{selector.signIn.로그인정보.이름}님</span>
                                                    <span><img src="./images/header/icon_new.svg" alt="" /></span>
                                                    <span><img src="./images/header/icon_down.png" alt="" /></span>
                                                </Link>
                                                {
                                                    state.signInTooltip && (
                                                        <div className="sign-tooltip">
                                                            <ul>
                                                                <li><Link to="!#">주문 내역</Link></li>
                                                                <li><Link to="!#">선물 내역</Link></li>
                                                                <li><Link to="!#">찜한 상품</Link></li>
                                                                <li><Link to="!#">배송지 관리</Link></li>
                                                                <li><Link to="!#">상품 후기</Link></li>
                                                                <li><Link to="!#">결제수단·컬리페이</Link></li>
                                                                <li><Link to="!#">적립금·컬리캐시</Link></li>
                                                                <li><Link to="!#">쿠폰</Link></li>
                                                                <li><Link to="!#">개인 정보 수정</Link></li>
                                                                <li><Link to="!#"><span>나의 컬리 스타일</span><img src="./images/header/icon_new.svg" alt="" /></Link></li>
                                                                <li><Link to="!#">컬리멤버스</Link></li>
                                                                <li ><a onClick={onClickLogOut} href="/index">로그아웃</a></li>
                                                            </ul>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </>
                                    )
                                }
                                <i>|</i>
                                <Link 
                                    to="/sub7" 
                                    onMouseEnter={onMouseEnterCustomer}
                                    
                                >고객센터 <img src="./images/intro/ico_down_16x10.png" alt="" /></Link>
                                {  
                                    state.is고객센터 && (
                                        <div 
                                            className="customer-center"
                                            onMouseLeave={onMouseLeaveCustomer}
                                        >
                                            <ul>
                                                <li><a href="!#">공지사항</a></li>
                                                <li><a href="!#">자주하는 질문</a></li>
                                                <li><a href="!#">1:1 문의</a></li>
                                                <li><a href="!#">대량주문 문의</a></li>
                                            </ul>
                                        </div>
                                    )
                                }
                                <i>|</i>
                                {
                                    selector.signIn.로그인정보===null && (
                                        <Link to="/sub7AdminSignIn">MyAdmin</Link>
                                    )
                                }
                            </aside>
                        </div>
                    </div>
                </div>
                <div className="row2 row">
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <Link to="/index">
                                    <img src="./images/intro/icon_logo.svg" alt="" />
                                    <span>마켓컬리</span>
                                </Link>
                                <i>|</i>
                                <a href="!#">뷰티컬리<img src="./images/intro/icon_logo_n.svg" alt="" /></a>
                            </div>
                            <div className="center">
                                <input type="text" name="search" id="search" /* value={state.검색어} */ placeholder="검색어를 입력해주세요" />
                                <button><img src="./images/intro/icon_zoom_purple.svg" alt="" /></button>
                            </div>
                            <div className="right">
                                <span>
                                    <a 
                                        href="!#" 
                                        onMouseEnter={onMouseEnterMap}
                                    ><img src="./images/intro/icon_marp.svg" alt="" /></a>
                                    <a href="!#"><img src="./images/intro/icon_heart.svg" alt="" /></a>
                                    <a href="!#"><img src="./images/intro/icon_cart.svg" alt="" /></a>
                                </span>
                                {

                                state.is배송지등록 && (
                                    <div 
                                        className="map-address" 
                                        onMouseLeave={onMouseLeaveMap}
                                    >
                                       { 
                                           selector.address.주소==='' && (
                                                <ul>
                                                    <li><strong>배송지를 등록</strong>하고</li>
                                                    <li>구매 가능한 상품을 확인하세요!</li>
                                                    <li>
                                                        <a href="!#">로그인</a>
                                                        <button onClick={onClickAddressUpdate}>
                                                            <img src="./images/header/icon_zoom_button.png" alt="" />
                                                            <span>주소검색</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            )
                                          
                                        }

                                        {
                                            selector.address.주소!=='' && (
                                                <ul>
                                                    <li>{`${selector.address.주소.주소1} ${selector.address.주소.주소2}`}</li>
                                                    <li>{'샛별배송'}</li>
                                                    <li>
                                                        <button className="address-update" onClick={onClickAddressUpdate}>
                                                            <span>배송지변경</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            )
                                           
                                        }
                                    </div>
                                )

                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={row3}  className={`row3 row${state.isFixed?' fixed':''}`}>
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <a href="!#" 
                                    onMouseEnter={onMouseEnterIsBar} 
                                    onMouseLeave={onMouseLeaveIsBar} 
                                    className={state.isBar ? "on" : ""}
                                >
                                    {/* 상태변수 isBar 이용 조건부 연산 이미지 선택 */}
                                    <img 
                                        src={state.isBar ? "./images/intro/icon_3bar_on.svg" : "./images/intro/icon_3bar.svg" } 
                                    alt="" />
                                    <span>카테고리</span>
                                </a>
                            </div>
                            <div className="center">
                                <nav> {/* 송신 useNavigate() 수신 location= useLocation() */}
                                    <Link to={{pathname:"/sub1"}} className={location.pathname==='/sub1'?"on":''}>신상품</Link>
                                    <Link to={{pathname:"/sub2", state:{name:"이순신", age: 29}}} className={location.pathname==='/sub2'?"on":''}>베스트</Link>
                                    <Link to={{pathname:"/sub3"}} className={location.pathname==='/sub3'?"on":''}>알뜰상품</Link>
                                    <Link to={{pathname:"/sub4"}} className={location.pathname==='/sub4'?"on":''}>특가/혜택</Link>
                                </nav>
                            </div>
                            <div className="right">
                                <a href="!#">
                                    <em>샛별・택배</em><span>배송안내</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}