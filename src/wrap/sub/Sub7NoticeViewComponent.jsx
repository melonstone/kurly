import React from 'react';
import './scss/sub7_view.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';


export default function Sub7NoticeViewComponent(){

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    // console.log(location.state);


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


    // 목록으로 이동
    const onClickList=(e)=>{
        e.preventDefault();
        navigate('/sub7');
    }
    // 글 수정
    const onClickUpdate=(e)=>{
        e.preventDefault();
        navigate('/sub7Update', {state: location.state});    // 수정컴포넌트로 이동
    }
    // 글 삭제
    const onClickDelete=(e)=>{
        e.preventDefault();

        // 폼데이터
        let formData = new FormData();
        formData.append('idx', location.state.번호);
        

        // AXIOS
        axios({
            url: 'http://kyscoo.dothome.co.kr/kurly/green_kurly_notice_table_delete.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            console.log(res.data);
            if(res.status===200){
                if(res.data===1){
                    confirmModalMethod('공지사항이 삭제되었습니다.');
                    navigate('/sub7');
                }
                else {
                    confirmModalMethod('공지사항 삭제에 실패했습니다.');
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        });

        navigate('/sub7');    // 삭제컴포넌트로 이동
    }

    return (
        <div id="sub7-view">
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>공지사항</h2>
                        <h3>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</h3>
                    </div>
                    <div className="content">
                        
                        <div className="view-box">
                            <ul>
                                <li>
                                    <ul>
                                        <li>
                                            <div className="left">
                                                <strong>제목</strong>
                                            </div>
                                            <div className="right">
                                                <p>{location.state.제목}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="left">
                                                <strong>작성자</strong>
                                            </div>
                                            <div className="right">
                                                <p>{location.state.작성자}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="left">
                                                <strong>작성일</strong>
                                            </div>
                                            <div className="right">
                                                <p>{`${new Date(location.state.작성일).getFullYear()}.${new Date(location.state.작성일).getMonth()+1}.${new Date(location.state.작성일).getDate()}`}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <div className="gap">
                                    <div className="contents">
                                        {
                                            location.state.내용.split('<br />').map((item)=>{
                                                return (
                                                    <p>{item}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </ul>
                        </div>
                        
                        <div className="button-box">
                            {
                                selector.signIn.로그인정보!==null && (
                                    selector.signIn.로그인정보.회원등급==='관리자' && (
                                        <>
                                            <button onClick={onClickDelete} type='button'>삭제</button>
                                            <button onClick={onClickUpdate} type='button'>수정</button>
                                        </>
                                    )
                                )
                            }
                            
                            <button onClick={onClickList} type='button'>목록</button>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};
