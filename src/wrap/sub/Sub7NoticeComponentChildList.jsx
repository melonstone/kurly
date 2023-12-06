import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Sub7NoticeComponentChildList({공지사항, 공지글수, 게시글수}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);


    console.log(selector);
    // console.log(selector.로그인정보);
    // console.log(selector.로그인정보.회원등급);

    // 글쓰기
    const onClickInsert=(e)=>{
        e.preventDefault();
        
        navigate('/sub7Insert');
    }

    // 글보기
    const onClickList=(e, item)=>{
        e.preventDefault();

        navigate('/sub7View', {state: item});   // state값 보내주기
    }

    return (
        <div className="right">
            <div className="right-header">
                <h2>공지사항</h2>
                <h3>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</h3>
            </div>
            <div className="right-list">
                <div className="list-header">
                    <ul className='column-box'>
                        <li className='col1'><span>번호</span></li>
                        <li className='col2'><span>제목</span></li>
                        <li className='col3'><span>작성자</span></li>
                        <li className='col4'><span>작성일</span></li>
                    </ul>
                </div>
                <ul className='list-data'>
                    {
                        공지사항.length > 0 && (
                            공지사항.map((item, idx)=>{
                                return (
                                    <li key={item.번호} onClick={(e)=>onClickList(e, item)}>
                                        <ul className='column-box'>
                                            {/* item.타입이 공지일경우 번호=>타입으로 출력 */}
                                            {/* 전체 idx 개수 중 번호===공지인 것을 제외한 수를 내림차순으로 정렬 */}
                                            <li className='col col1'><span>{item.타입==='공지'? item.타입 : (공지사항.length - idx)}</span></li>
                                            <li className='col col2'><span>{item.제목}</span></li>
                                            <li className='col col3'><span>{item.작성자}</span></li>
                                            {/*
                                                item.작성일은 시간까지 전부 나오므로 년-월-일의 구성으로 출력한다.
                                                new Date() 사용 => 문자열로 저장된 JSON 데이터 변환
                                                .getFullYear()  /   .getMonth()+1   //  .getDate()로 추출해서 출력하게끔 구현한다.
                                            */}
                                            <li className='col col4'><span>{`${new Date(item.작성일).getFullYear()}.${new Date(item.작성일).getMonth()+1}.${new Date(item.작성일).getDate()}`}</span></li>
                                        </ul>
                                    </li>
                                )
                            })
                        )
                    }
                </ul>
            </div>
            {
                selector.signIn.로그인정보!==null && (  // 로그인 한 경우
                    selector.signIn.로그인정보.회원등급==='관리자' && (
                        <div className="button-box">
                            <button onClick={onClickInsert}>글쓰기</button>
                        </div>
                    )
                )
            }
        </div>
    );
};