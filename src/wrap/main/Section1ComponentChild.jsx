import React from 'react';

export default function Section1ComponentChild({슬라이드,n}) {

    const slideWrap = React.useRef();  // .slide-wrap 선택자 돔요소 선택

    // 0. 슬라이드의 갯수가 들어오면 아래를 실행    
    React.useEffect(()=>{
        slideWrap.current.style.width = `${100 * n}%`; // 2400%
    },[n]);

    // 메인슬라이드 컨트롤 
    // 0. 상태변수
    const [cnt, setCnt] = React.useState(0);
    const [toggle, setToggle] = React.useState(0);
    const [isArrow, setIsArrow] = React.useState(false);  // 자동슬라이드 동작 false 일때만


    // 1-1. 슬라이드 애니메이션
    //    오른쪽에서 왼쪽으로 부드럽게 이동하는 애니메이션구현
    const mainSlide=()=>{
        slideWrap.current.style.transition = 'all 0.6s ease-in-out';
        slideWrap.current.style.left = `${-100 * cnt}%`;
        if(cnt!==0){ // 처음 실행할 때 0(1)부터 시작
            returnSlide();
        }
    }
        // 1-2 슬라이드 리턴
        const returnSlide=()=>{
            // 리턴 다음
            if(cnt>(n-2)){ // 24-2 = 22
                setToggle(1);
                setCnt(1); // 리턴 후에는 반드시 1로 설정
                slideWrap.current.style.transition = 'none';
                slideWrap.current.style.left = `${-100 * 0}%`;
            }
            // 리턴 이전 총슬라이드 22개 인경우 인덱스번호 0(1) ~ 21(22)
            if(cnt<0){
                setToggle(1);
                setCnt(n-2-1); // 리턴 후에는 반드시 24-2-1= 21로 설정
                slideWrap.current.style.transition = 'none';
                slideWrap.current.style.left = `${-(100*(n-2))}%`;
            }
        }

    // 2. 슬라이드 구현 : cnt 상태변수 변경되면 즉시 메인슬라이드 메서드 호출 실행
    React.useEffect(()=>{
        if(toggle===0){ // 리턴 없는경우
            mainSlide();
        }
        else {  // 리턴이 있는경우
            setToggle(0); // 리턴 초기화
            setTimeout(()=>{ // 타이머 동작시 비동기 처리방식 순차처리 0.1초 후에 메인 슬라이드 실행 
                mainSlide();
            },100);
        }
    },[cnt]);

    // 3-1. 다음카운트 클릭 이벤트
    const onClickNext=(e)=>{
        e.preventDefault();
        setCnt(cnt => cnt+1);  // cnt+1
    }

    // 3-2. 이전카운트 클릭 이벤트
    const onClickPrev=(e)=>{
        e.preventDefault();
        setCnt(cnt => cnt-1);  // cnt-1
    }

    // 4. 자동 타이머 4초 간격 자동 실행
    React.useEffect(()=>{
        if(isArrow===false){    
            let setId = 0;
            setId = setInterval(()=>{
                setCnt(cnt => cnt+1); // cnt => cnt+1
            }, 4000);
            return () => clearInterval(setId); // 한줄 코딩 화살표함수 즉시 실행 반환
        }
    },[isArrow]); // 로딩시 실행 1회

    // 5. 슬라이드 콘테이너 마우스 오버시
    //    화살표 보이기
    const onMouseEnterContainer=()=>{
        setIsArrow(true);
    }

    // 6. 슬라이드 콘테이너 마우스 아웃시
    //    화살표 숨기기
    const onMouseLeaveContainer=()=>{
        setIsArrow(false);
    }

    return (
        <div className="slide-container"  onMouseEnter={onMouseEnterContainer}  onMouseLeave={onMouseLeaveContainer}>
            <div className="slide-view">
                <ul ref={slideWrap}  className="slide-wrap">  
                    {
                        슬라이드.map((item, idx)=>{
                            return (
                                <li className="slide" key={item.번호}>
                                    <img src={`./images/intro/section1/${item.이미지}`} alt="" />
                                </li>
                            )
                        })
                    }   
                </ul>
            </div>

            <a href="!#" onClick={onClickNext} className={`next-arrow-btn blind${isArrow?' on':''}`}>next-arrow-btn</a>
            <a href="!#" onClick={onClickPrev} className={`prev-arrow-btn blind${isArrow?' on':''}`}>prev-arrow-btn</a>
            {/* 슬라이드 네비게이션 => 페이지네이션 */}
            <span className='page-num-box'><em>{cnt+1>n-2?1:cnt+1}</em><i>/</i><em>{n-2}</em></span>

        </div>
    );
};
