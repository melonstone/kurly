import React from "react";
import './scss/QuickMenu.scss';
import { useSelector } from "react-redux";

export default function QuickMenuComponent(){

    const selector = useSelector((state)=>state);

    const [isFixed, setIsFixed] = React.useState(false);

    React.useEffect(()=>{
       window.addEventListener('scroll', function(){
            let isFixed = false;
            if(this.window.scrollY >= 400){
                isFixed = true;
            }
            else{
                isFixed = false;
            }
            setIsFixed(isFixed);
       });     
    },[]);


    //  퀵메뉴 위 아래 슬라이드 구현  
    //  - 0. 분석 & 자료수집(준비완료) * 기획 & 설계    
    //  - 1. 슬라이드랩퍼(UL) 애니메이션 구현 => 선택자  useRef()
    //  - 2. 상태변수 => cnt, setCnt
    //  - 3-1. 아래(down버튼) 클릭이벤트 => onClickEvent cn++ 올라간다.  제한조건   
    //  - 3-2. 위(up버튼) 클릭이벤트 => onClickEvent   cnt-- 내려간다.   제한조건
    //  - 4. 메인슬라이드 메서드 랩퍼 애니메이션 구현
    //  - 5. 상태변수 cnt 값이 변경되면 즉식 실행하는 useEffect(); 훅 구현 
    //       => 메인슬라이드 함수 호출

    // 선언문
    const refSlideWrap = React.useRef(); // 1. 선택자 => 애니메이션 대상 위 아래 부드럽게 이동   
    const [cnt, setCnt] = React.useState(0); // 2. 상태변수 선언하기

    // 3. 클릭 이벤트 메서드 등록(이벤트 e, 방향 direction)
    // 3-1. 아래(down버튼) 클릭이벤트 => onClickEvent cn++ 올라간다.
    // 3-2. 위(up버튼) 클릭이벤트 => onClickEvent   cnt-- 내려간다.
    const onClickUpDownEvent=(e, direction)=>{
        e.preventDefault();
        if(direction==='down'){  // 4개인경우 6-(3+1)=2
            if(cnt > selector.quickMenuViewProduct.quickMenuViewProduct.length-4 ){ // 2보다 크면 증가하고 3이면 종료
                return; // 0보다 크면 즉 1이면 종료
            }
            else{ // <=2 보다 작거나 같다면  => 3
                setCnt(cnt+1); // 3
            }
        }
        else if(direction==='up'){
            if(cnt > 0){ // 0 보다 크면 감소 1-1
                setCnt(cnt-1);
            }
            else{ // 0 보다 작거나 같다면 리턴  0 이면 종료
                return;
            }
        }
    }

    // 4. 메인슬라이드 메서드 랩퍼 선택자(refSlideWrap) 부드럽게 애니메이션 구현
    const mainSlide=()=>{
        try{
            refSlideWrap.current.style.transition = `all 0.3s ease-in-out`;
            refSlideWrap.current.style.transform = `translateY(${-94*cnt}px)`;
        } 
        catch(e){}
    }

    // 5. 상태변수 cnt 값이 변경되면 즉식 실행하는 useEffect(); 훅 구현 
    //    => 메인슬라이드 함수 호출 
    React.useEffect(()=>{
        mainSlide();
    },[cnt]);




    return(
        <div id="quikMenu" className={isFixed?'on':''}>
            <ul>
                <li>
                    <a href="!#">
                        <img src="./images/intro/deliveryInfo.png" alt="" />
                    </a>
                </li>

                <li>
                    <ul>
                        <li><a href="!#">등급별혜택</a></li>
                        <li><a href="!#">레시피</a></li>                        
                    </ul>
                </li>

                {
                selector.quickMenuViewProduct.quickMenuViewProduct.length > 0 && (
                <li>
                    <ul>
                        <li><button onClick={(e)=>onClickUpDownEvent(e, 'up')} className="up-arrow-btn"></button></li>
                        <li><h2>최근본상품</h2></li>
                        <li>
                            <ul ref={refSlideWrap}>
                                {
                                    selector.quickMenuViewProduct.quickMenuViewProduct.map((item)=>{
                                        return(
                                            <li key={item.번호}>
                                                <a href="!3">
                                                    <img src={item.이미지} alt="" />
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                        <li><button onClick={(e)=>onClickUpDownEvent(e, 'down')}  className="down-arrow-btn"></button></li>
                    </ul>
                </li>
                )
                }
            </ul>
        </div>
    )
}