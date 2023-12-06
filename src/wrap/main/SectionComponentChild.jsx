import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewProduct } from '../../reducer/viewProduct';
import { viewProductIsFlag } from '../../reducer/viewProductIsFlag';
import { quickMenuViewProduct } from '../../reducer/quickMenuViewProduct';

export default function SectionComponentChild ({ 타임세일, 제품, n, 애니메이션, 이미지배너, 칸수, 이미지경로}) {
    
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    
    const slideWrap = React.useRef(); // 1. 섹션2 메인슬라이드 애니메이션 대상
    // 타임세일 첫번째칸
    const slide = React.useRef(); // 1. 섹션2 메인슬라이드 애니메이션 대상
    
    // 슬라이드, 타임세일, 이미지내버 
    const refSlide = React.useRef([]); // 선택자 배열 []
 
    const [state, setState] = React.useState({
        isLeftArrow: false,
        isRightArrow: false,
        cnt: 0,  // 2. 슬라이드 카운트
        H: 0, // 시
        M: 0, // 분
        S: 0, // 초
    });

    // 1. 최근 본상품 클릭 이벤튼
    const onClickViewProduct=(e, item, path)=>{
        e.preventDefault();

        let altImg = "b5a8601f-c837-4d1f-bc7d-f3b3f5daefc2.jpg";
    
        let obj = {
            번호: item.번호,
            이미지: `${process.env.PUBLIC_URL}${path}${이미지경로}/${이미지경로==='section5'?altImg:item.이미지}`,
            제품명: item.제품명,
            정가: item.정가,
            할인율: item.할인율,
            판매가: Math.round(item.정가 * (1 - item.할인율)),
            제품특징: item.제품특징,
            제조사: item.제조사,
            제조일시: item.제조일시,
            판매처: item.판매처,
            보관방법: item.보관방법,
            배송: item.배송,
            일시: new Date().getTime(),
        }

        dispatch(viewProduct(obj));
    }
    
    // 2. viewProduct.current: 최근 현재 본 상품 상태변수 값이 들어오면
    React.useEffect(()=>{

        // 로컬스토레이지에 저장하기 => 이전에 저장된 데이터를 가져와서 지금데이터와 누적
        // 1. 로컬스토레이지(키)에 저장된 데이터 없는 경우 : 배열로 1개만 저장한다.
        let imsi = [];
        if( localStorage.getItem('KURLY_VIEW_PRODUCT')===null ){
            if(Object.keys(selector.viewProduct.current).length > 0){ // 빈객체 확인
                imsi = [selector.viewProduct.current];  // [{...}] 점검
                localStorage.setItem("KURLY_VIEW_PRODUCT", JSON.stringify(imsi));
                
                dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));
                
            }   
        }
        else{
            // 2. 로컬스토레이지에 저장된 데이터 있는 경우 : 가져와서 누적 보관(스택Stack)
            let result = JSON.parse(localStorage.getItem('KURLY_VIEW_PRODUCT'));

            // 중복검사 제외
            let filterResult = result.map((item)=>item.번호===selector.viewProduct.current.번호 ? true : false);
            
            if(filterResult.includes(true)!==true){
                if(Object.keys(selector.viewProduct.current).length>0){ // 빈객체 확인
                    result = [selector.viewProduct.current, ...result];  // 스택Stack
                    // 로컬스토레이지 저장소 저장하기
                    localStorage.setItem("KURLY_VIEW_PRODUCT", JSON.stringify(result));
                    
                    dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));
                }    
            }     
        }

    },[selector.viewProduct.current])


    // 3. 최근 본상품 상태변수에 로컬스토레이지 저장소 데이터 가져와서 저장한다. 끝
    React.useEffect(()=>{
        
        if(localStorage.getItem('KURLY_VIEW_PRODUCT')!==null) {
            let result = JSON.parse(localStorage.getItem('KURLY_VIEW_PRODUCT'));
            if(result.length>0){

                dispatch(quickMenuViewProduct(result));

            }            
        }

    },[selector.viewProductIsFlag.isFlag]);





    // 화살버튼
    const [isArrowPrev, setIsArrowPrev] = React.useState(false);
    const [isArrowNext, setIsArrowNext] = React.useState(false);

    // cnt => 0 <= 이하 이면 좌측화살 숨김
    // cnt => 0 >  보다 크면 좌측화살 보임
    React.useEffect(()=>{
        let isArrowPrev = false;
        let isArrowNext = false;
        if(state.cnt<=0){
            isArrowPrev = false;   // 숨김
        }
        else{
            isArrowPrev = true;    // 보임
        }        

        if(state.cnt>=4){
            isArrowNext = false;   // 숨김
        }
        else{
            isArrowNext = true;    // 보임
        }
        setIsArrowPrev(isArrowPrev)// 이전버튼
        setIsArrowNext(isArrowNext)// 다음버튼

    },[state.cnt]);

    // 슬라이드 랩퍼박스, 슬라이드 스타일 너비와 개수
    // 칸수 프롭스 값이 들어오면 실행 오류 없는 경우 실행
    React.useEffect(()=>{
        if(타임세일.타임세일){
            try{
                let slideWidth = 1068 / 칸수;  // 슬라이드 너비 개산
                // 타임세일 1칸
                slide.current.style.width = `${slideWidth}px`;  //1/3 너비
                
                for(let i=0; i<n; i++){
                    if(칸수===3 && n===1){
                        refSlide.current[i].style.width = `${slideWidth * 2}px`;
                    }
                    else{
                        refSlide.current[i].style.width = `${slideWidth}px`;
                    }                    
                }
                // 3칸이고 이미지 1개 => 이미지너비칸 슬라이드너비*2
                


            } catch(e) {
                return;
            }    
        }
        
        if(이미지배너){
            try{
                let slideWidth = 1068 / 칸수;  // 슬라이드 너비 개산
                for(let i=0; i<n; i++){
                    refSlide.current[i].style.width = `${slideWidth}px`;
                }   
            } catch(e) {
                return;
            }    
        }
 

        if(애니메이션){
            try{
                let slideWidth = 1068 / 칸수;  // 슬라이드 너비 개산
                for(let i=0; i<n; i++ ){
                    slide.current.style[i].width = `${slideWidth}px`;
                }
                slideWrap.current.style.width = `${slideWidth * n}px`;     
            } catch(e) {
                return;
            }    
        }

    },[칸수]);


    const onMouseEnterLeftArrow=(e)=>{
        setState({
            ...state,
            isLeftArrow: true
        })
    }
    const onMouseEnterRightArrow=(e)=>{
        setState({
            ...state,
            isRightArrow: true
        })
    }

    const onMouseLeaveLeftArrow=()=>{
        setState({
            ...state,
            isLeftArrow: false
        })
    }

    const onMouseLeaveRightArrow=()=>{
        setState({
            ...state,
            isRightArrow: false
        })
    }


    
    // 3. 섹션2 메인슬라이드 메서드(함수)
    const mainSlide=()=>{
        slideWrap.current.style.transition = `all 0.6s ease-in-out`;
        // slideWrap.current.style.left = `${-1068 * state.cnt}px`;
        slideWrap.current.style.transform = `translateX(${-1068*state.cnt}px)`;
    }

    // 4-1. 다음슬라이드 카운트 클릭이벤트
    const onClickNextBtn=(e)=>{
        e.preventDefault();

        if(state.cnt>=4){
            setState({
                ...state,
                cnt: 4
            });
        }
        else {
            setState({
                ...state,
                cnt: state.cnt+1
            })
        }      
    }

    // 4-2. 이전슬라이드 카운트 클릭이벤트
    const onClickPrevBtn=(e)=>{
        e.preventDefault();

        if(state.cnt<=0){
            setState({
                ...state,
                cnt: 0
            });
        }
        else{
            setState({
                ...state,
                cnt: state.cnt-1
            })
        }
       
    }

    // 5. 유즈이펙트
    React.useEffect(()=>{        
        mainSlide(); // 애니메이션 구현  
    },[state.cnt]);  // 카운트 변수 변경되면 동작




    // 카운트 타이머 24시간 일일특가
    // 로딩시 새로고침새도 항상 실행
    // 1초에 한번씩 카운트해서 남은 시간을 표기한다.
    React.useEffect(()=>{

        if(타임세일.타임세일) {
         
         const setId = setInterval(function(){
             let timeSalse = 타임세일.타이머일시;
             let timeHours = 타임세일.타임시간;
             let start = new Date(timeSalse); // 타임세일 시작
                 start.setHours( start.getHours() + timeHours ); // 24시간 시작
             let now = new Date();
             let countTime = start - now; // 시작시간 - 현재시간 => 남은시간
             let H=0;
             let M=0;
             let S=0;
 
             // 타임세일 종료 싯점 조건문
             if( now >= start){
                 clearInterval(setId);
                 H=0;
                 M=0;
                 S=0;
             }
             else{
                 H= Math.floor(countTime/(60*60*1000)) % timeHours; // 남은 시
                 M= Math.floor(countTime/(60*1000)) % 60;    // 남은 분
                 S= Math.floor(countTime/(1000)) % 60;       // 남은 초
             }
 
             setState({
                 ...state,
                 H: H < 10 ? `0${H}`:H,
                 M: M < 10 ? `0${M}`:M,
                 S: S < 10 ? `0${S}`:S,
             })    
 
         },1000);
        }
 
     },[타임세일, state]);
 



    return (
        <div className="slide-container">
            <div className="slide-view">
                <ul ref={slideWrap} className="slide-wrap">

                   {
                    타임세일.타임세일 && (
                        <li ref={slide} className="slide slide1">
                            <div className="col-gap">
                                <div className="txt-box">                                        
                                    <h2>{타임세일.캡션1}</h2>                                
                                    <h3>{타임세일.캡션2}</h3>                                
                                    <h4>
                                        <span className='icon-timer'>
                                            <img src="./images/intro/section3/icon_timer.svg" alt="" />
                                        </span>
                                        <span className='count-timer'>
                                            <strong>{state.H}</strong>
                                            <i>:</i>
                                            <strong>{state.M}</strong>
                                            <i>:</i>
                                            <strong>{state.S}</strong>
                                        </span>
                                    </h4>                                
                                    <h5>{타임세일.캡션3}</h5>                                
                                </div>
                            </div>
                        </li>
                    )     
                   }


                   {
                        제품.map((item, idx)=>{
                            return(
                                <li ref={ (e)=> refSlide.current[idx]=e }  className={`slide slide${idx}`} key={item.번호}>
                                    <div className="col-gap" onClick={(e)=>onClickViewProduct(e, item, './images/intro/')}>
                                        <div className="img-box">
                                            <a href="!#"><img src={`./images/intro/${이미지경로}/${item.이미지}`} alt="" /></a>
                                        </div>
                                        {
                                            !이미지배너 && (
                                                <div className="txt-box">                                        
                                                    <p><a href="!#"><img src="./images/intro/section2/icon_cart.svg" alt="" /> 담기</a></p>
                                                    <h3>{item.제품명}</h3>
                                                    <h4>{item.정가.toLocaleString('ko-KO')}원</h4>
                                                    <h5><em>{Math.round(item.할인율*100)}%</em><strong>{Math.round(item.정가*(1-item.할인율)).toLocaleString('ko-KO')}원</strong></h5>
                                                    <h6><img src="./images/intro/section2/icon_count.svg" alt="" />215</h6>
                                                </div>
                                            )
                                        }
                                    </div>
                                </li>
                            )
                        })
                   }
            
                </ul>
            </div>

            {             
            애니메이션 && (
                <a              
                    href="!#"  
                    onClick={onClickPrevBtn} 
                    onMouseEnter={onMouseEnterLeftArrow} 
                    onMouseLeave={onMouseLeaveLeftArrow} 
                    className={`sec2-left-arrow${isArrowPrev?' on':''}`}
                    ><img src={`./images/intro/${state.isLeftArrow?'icon_circle_left_arrow_purple.svg':'icon_circle_left_arrow_black.svg'}`} alt="" />
                </a>
            )
            }
            {
            애니메이션 && (
                <a 
                    onClick={onClickNextBtn}
                    href="!#" 
                    onMouseEnter={onMouseEnterRightArrow} 
                    onMouseLeave={onMouseLeaveRightArrow} 
                    className={`sec2-right-arrow${isArrowNext?' on':''}`}
                    ><img src={`./images/intro/${state.isRightArrow?'icon_circle_left_arrow_purple.svg':'icon_circle_left_arrow_black.svg'}`} alt="" />
                </a>
            )
            }
        </div>
    );
};