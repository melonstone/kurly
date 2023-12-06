import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewProduct } from '../../../reducer/viewProduct';
import { viewProductIsFlag } from '../../../reducer/viewProductIsFlag';
import { quickMenuViewProduct } from '../../../reducer/quickMenuViewProduct';

export default function ProductList({ filterDeleteMethod, 필터,상품,이미지경로}) {
    
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);


    const onClickDeleteEvent=(e, item)=>{
        e.preventDefault();
        filterDeleteMethod(item); // 삭제데이터 전송
    }


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


    return (
        <div className="product-list">
            {
                필터.length > 0 && (
                    <div className="filter-box">
                        {
                        
                            필터.map((item, idx)=>{
                                return(
                                    <span key={idx}>
                                        <em>{item}</em>
                                        <a href="!#" onClick={(e)=>onClickDeleteEvent(e,item)}><img src="./images/sub/sub1/icon_delete.svg" alt="" /></a>
                                    </span>
                                )
                            })
                            
                        }   
                    </div>
                )
            }
            <ul>
                {
                    상품.length > 0 && (
                        상품.map((item,idx)=>{
                            return(
                                <li className={`list list${idx+1}`} key={item.번호}>
                                    <div className="col-gap"  onClick={(e)=>onClickViewProduct(e, item, './images/sub/')}>
                                        <div className="img-box">
                                        <a href="!#"><img src={`./images/sub/sub1/${item.이미지}`} alt="" /></a>
                                        </div>
                                        <div className="txt-box">                                        
                                            <p><a href="!#"><img src="./images/intro/section2/icon_cart.svg" alt="" /> 담기</a></p>
                                            <h6>{item.배송}</h6>
                                            <h3>{item.제품명}</h3>
                                            <h6>{item.제품특징}</h6>
                                            {
                                                item.할인율!==0 && <h4>{item.정가.toLocaleString('ko-KR')}원</h4>
                                            }
                                            <h5>
                                            {
                                                item.할인율!==0 && <em>{Math.round(item.할인율*100)}%</em>
                                            }
                                                <strong className={item.할인율===0?'on':''}>{Math.round(item.정가*(1-item.할인율)).toLocaleString('ko-KR')}원</strong></h5>
                                                
                                            <h6><img src="./images/intro/section2/icon_count.svg" alt="" />{item.리뷰}</h6>                                                
                                            <h6>{item.유형}</h6>
                                            <h6>{item.무료배송}</h6>
                                        </div>

                                    </div>
                                </li>
                            )
                        })
                    )
                }
            </ul>
        </div>       
    );
};