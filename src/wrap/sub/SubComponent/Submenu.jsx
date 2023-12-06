import React from 'react';

export default function Submenu({필터, filterSetterMethod, 서브메뉴}) {

    const refSub = React.useRef([]);  // 서브박스 선택자 배열

    const [state, setState] = React.useState({       
        서브높이: [],
        sub: [],
        isTab: true
    });


    // 서브메뉴 버튼 클릭 이벤트 통합
    const onClickSub=(e, n)=>{
        e.preventDefault();
        let imsi = state.sub;

        if(refSub.current[n].offsetHeight!==0){
            refSub.current[n].style.transition = "all 0.3s ease-in-out";
            refSub.current[n].style.height = 0;       // 서브메뉴 접기            
            imsi[n] = true;
        }
        else{
            refSub.current[n].style.transition = "all 0.3s ease-in-out";
            refSub.current[n].style.height = state.서브높이[n];  // 서브메뉴 펼치기
            imsi[n] = false;
        }
        setState({
            ...state,
            sub: imsi
        })
    }



    // 체크 이벤트 클릭 이벤트 통합
    const onClickChecked=(e, item)=>{
        e.preventDefault();

        let $필터 = 필터;  // 상위컴포넌트 프롭스 데이터

        if($필터.includes(item)===false){  // 필터에 지금 클릭한 항목이 없다면
            $필터 = [...$필터, item];  // unshift() 맨앞삽입, push() 맨뒤
            // 필터.push(item);
        }
        else{
            $필터 = $필터.filter((data)=>data!==item);  // shift(),  pop()
        }
        // 상위컴포넌트에 메서드 매개변수로 전달하기
        filterSetterMethod( $필터 );
    }

    const onClickTabBtn=(e, n)=>{
        e.preventDefault(); 
        let isTab = true;
        if(n===0){ // 탭버튼 0
            isTab = true; 
        }
        else{  // 탭버튼 1
            isTab = false;
        }   
        setState({
            ...state,
            isTab: isTab
        });
    }





    // 서브메뉴 이펙트 구현
    React.useEffect(()=>{
       
        // 서브메뉴 총 6개
        let sub = [];
        for(let i=0; i<refSub.current.length; i++){
            sub = [...sub, false];
        }
            
        // 서브박스 높이 6개 설정하기
        let 서브높이 = [];        
        for(let i=0;  i<refSub.current.length; i++){
            서브높이 = [...서브높이, `${refSub.current[i].offsetHeight}px` ]; //각 서브 높이 저장
        }

        setState({
            ...state,
            서브높이: 서브높이,
            sub: sub
        });

    },[서브메뉴]);

    return (
        <nav className='sub-menu'>
            <ul>
                <li>
                    <a href="!#" onClick={(e)=>onClickSub(e,0)} className={`main-btn${state.sub[0]?' on':''}`}><strong>카테고리</strong><i><img src="./images/sub/sub1/icon_arrow_down.svg" alt="" /></i></a>
                    <div ref={(e)=>(refSub.current[0]=e)} className="sub sub1">
                        <ul>
                            {

                                서브메뉴.카테고리.length > 0 && (
                                    서브메뉴.카테고리.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <a href='!#' onClick={(e)=>onClickChecked(e, item)} className={`check-btn${필터.includes(item)?' on':''}`}><span>{item}</span><em>91</em></a>
                                            </li>
                                        )
                                    })
                                )

                            } 
                        </ul>
                        <button><span>카테고리더보기</span><i><img src="./images/sub/sub1/icon_arrow_right.svg" alt="" /></i></button>
                    </div>
                </li>
                <li>
                    <a href="!#" onClick={(e)=>onClickSub(e,1)} className={`main-btn${state.sub[1]?' on':''}`}><strong>브랜드</strong><i><img src="./images/sub/sub1/icon_arrow_down.svg" alt="" /></i></a>
                    <div ref={(e)=>(refSub.current[1]=e)} className="sub sub2">
                        <div className="tab">
                            <button onClick={(e)=>onClickTabBtn(e, 0)} className={`tab-btn1${ state.isTab?' on':''}`}>가나다순</button>
                            <button onClick={(e)=>onClickTabBtn(e, 1)} className={`tab-btn2${!state.isTab?' on':''}`}>상품많은순</button>
                        </div>                                                
                        {
                            state.isTab && (
                                <div className="sub2-1">
                                    <ul>
                                        {
                                            서브메뉴.브랜드.가나다순.length > 0 && (
                                                서브메뉴.브랜드.가나다순.map((item, idx)=>{
                                                    return(
                                                        <li key={idx}>
                                                            <a href='!#' onClick={(e)=>onClickChecked(e, item)} className={`check-btn${필터.includes(item)?' on':''}`}><span>{item}</span><em>91</em></a>
                                                        </li>
                                                    )
                                                })
                                            )
                                        }
                                    </ul>
                                    <button><span>카테고리더보기</span><i><img src="./images/sub/sub1/icon_arrow_right.svg" alt="" /></i></button>
                                </div>    
                            )
                        }

                        {    
                            !state.isTab && (
                                <div className="sub2-2">
                                    <ul>
                                        {
                                             서브메뉴.브랜드.상품많은순.length > 0 && (
                                                서브메뉴.브랜드.상품많은순.map((item, idx)=>{
                                                    return(
                                                        <li key={idx}>
                                                            <a href='!#' onClick={(e)=>onClickChecked(e, item)} className={`check-btn${필터.includes(item)?' on':''}`}><span>{item}</span><em>91</em></a>
                                                        </li>
                                                    )
                                                })
                                             )
                                        }
                                    </ul>
                                    <button><span>카테고리더보기</span><i><img src="./images/sub/sub1/icon_arrow_right.svg" alt="" /></i></button>
                                </div>  
                            )
                        }
                    </div>

                </li>
                <li>
                    <a href="!#"  onClick={(e)=>onClickSub(e,2)} className={`main-btn${state.sub[2]?' on':''}`}><strong>가격</strong><i><img src="./images/sub/sub1/icon_arrow_down.svg" alt="" /></i></a>
                    <div ref={(e)=>(refSub.current[2]=e)} className="sub sub3">
                        <ul>
                            {
                                서브메뉴.가격.length > 0 && (
                                    서브메뉴.가격.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <a href='!#' onClick={(e)=>onClickChecked(e, item)} className={`check-btn${필터.includes(item)?' on':''}`}><span>{item}</span><em>91</em></a>
                                            </li>
                                        )
                                    })
                                )
                            }
                        </ul>
                        <button><span>카테고리더보기</span><i><img src="./images/sub/sub1/icon_arrow_right.svg" alt="" /></i></button>
                    </div>
                </li>
                <li>
                    <a href="!#" onClick={(e)=>onClickSub(e,3)} className={`main-btn${state.sub[3]?' on':''}`}><strong>혜택</strong><i><img src="./images/sub/sub1/icon_arrow_down.svg" alt="" /></i></a>
                    <div ref={(e)=>(refSub.current[3]=e)} className="sub sub4">
                        <ul>
                            {
                                서브메뉴.혜택.length > 0 && (
                                    서브메뉴.혜택.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <a href='!#' onClick={(e)=>onClickChecked(e, item)} className={`check-btn${필터.includes(item)?' on':''}`}><span>{item}</span><em>91</em></a>
                                            </li>
                                        )
                                    })
                                )
                            }
                        </ul>
                        <button><span>카테고리더보기</span><i><img src="./images/sub/sub1/icon_arrow_right.svg" alt="" /></i></button>
                    </div>
                </li>
                <li>
                    <a href="!#"  onClick={(e)=>onClickSub(e,4)}  className={`main-btn${state.sub[4]?' on':''}`}><strong>유형</strong><i><img src="./images/sub/sub1/icon_arrow_down.svg" alt="" /></i></a>
                    <div ref={(e)=>(refSub.current[4]=e)} className="sub sub5">
                        <ul>
                            {
                                서브메뉴.유형.length > 0 && (
                                    서브메뉴.유형.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <a href='!#' onClick={(e)=>onClickChecked(e, item)} className={`check-btn${필터.includes(item)?' on':''}`}><span>{item}</span><em>91</em></a>
                                            </li>
                                        )
                                    })
                                )
                            }
                        </ul>
                        <button><span>카테고리더보기</span><i><img src="./images/sub/sub1/icon_arrow_right.svg" alt="" /></i></button>
                    </div>
                </li>
                <li>
                    <a href="!#"  onClick={(e)=>onClickSub(e,5)} className={`main-btn${state.sub[5]?' on':''}`}><strong>특정상품 제외</strong><i><img src="./images/sub/sub1/icon_arrow_down.svg" alt="" /></i></a>
                    <div ref={(e)=>(refSub.current[5]=e)} className="sub sub6">
                        <ul>
                            {
                                 서브메뉴.특정상품제외.length > 0 && (
                                    서브메뉴.특정상품제외.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <a href='!#' onClick={(e)=>onClickChecked(e, item)} className={`check-btn${필터.includes(item)?' on':''}`}><span>{item}</span><em>91</em></a>
                                            </li>
                                        )
                                    })
                                 )
                            }
                        </ul>
                        <button><span>카테고리더보기</span><i><img src="./images/sub/sub1/icon_arrow_right.svg" alt="" /></i></button>
                    </div>
                </li>
            </ul>
        </nav>
    );
};