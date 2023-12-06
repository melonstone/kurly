import React from 'react';
import Sub7NoticeLeftComponent from './Sub7NoticeLeftComponent';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';


export default function Sub7NoticeUpdateComponent(){

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    console.log('수정컴포넌트');
    console.log(location);

    // 상태관리변수
    const [state, setState] = React.useState({
        isSelect: false,
        유형: '',
        작성자: '',
        아이디: '',
        제목: '',
        내용: ''
    })


    // location으로 가져온 데이터를 상태변수에 저장 => 바인딩
    React.useEffect(()=>{
        
        if(location.state.아이디!==''){
            setState({
                ...state,
                번호: location.state.번호,
                유형: location.state.유형,
                작성자: location.state.작성자,
                아이디: location.state.아이디,
                제목: location.state.제목,
                내용: location.state.내용
            });
        }

    },[])

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



    // 유형 클릭이벤트
    const onClickSelect=(e)=>{
        setState({
            ...state,
            isSelect: true
        })
    }

    // 유형
    const onChangeSelect=(e)=>{
        setState({
            ...state,
            유형: e.target.value
        })
    }
    // 제목 입력
    const onChangeSubject=(e)=>{
        setState({
            ...state,
            제목: e.target.value
        })
    }
    // 내용 입력
    const onChangeContents=(e)=>{
        setState({
            ...state,
            내용: e.target.value
        })
    }

    // 폼전송
    const onSubmitInsertForm=(e)=>{
        e.preventDefault();

        if(state.제목===''){
            confirmModalMethod('제목을 입력해 주세요.');
        }
        else if(state.내용===''){
            confirmModalMethod('내용을 입력해 주세요.');
        }
        else{

            // 폼데이터
            let formData = new FormData();
            formData.append('idx', state.번호);
            formData.append('wType', state.유형);
            formData.append('wName', state.작성자);
            formData.append('wId', state.아이디);
            formData.append('wSubject', state.제목);
            formData.append('wContent', state.내용);

            console.log(formData);
            // AXIOS
            axios({
                url: 'http://kyscoo.dothome.co.kr/kurly/green_kurly_notice_table_update.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status===200){
                    confirmModalMethod('공지사항이 수정되었습니다.');
                    navigate('/sub7');
                }
                else {
                    confirmModalMethod('공지사항 내용을 확인하고 다시 시도해 주세요.');
                }
            })
            .catch((err)=>{
                console.log(err);
            });
        }


    }

    return (
        <main id='sub7' className='sub7-insert-form'>
            <section id="section1">
                <div className="container">
                    <div className="content">

                        {/* left 박스 */}
                        <Sub7NoticeLeftComponent />

                        <div className="right sub7-insert-form" >
                            <div className="right-header">
                                <h2>공지사항</h2>
                        
                            </div>
                            <div className="right-list">

                                {/* 공지사항 글쓰기 입력폼 */}
                               <form onSubmit={onSubmitInsertForm} autoComplete='off'>

                                    <div className="insert-form">
                                        <ul>
                                            <li>
                                                <div className="gap">
                                                    <label className='left-label' htmlFor="wType">유형<i>*</i></label>
                                                    <select onChange={onChangeSelect} onClick={onClickSelect} name="wType" id="wType">
                                                        <option value="">게시글</option>
                                                        <option value="공지">공지글</option>
                                                    </select>
                                                    <span className={`icon-arrow-down${state.isSelect===true? ' on' : ''}`}></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <label className='left-label'>작성자<i>*</i></label>
                                                    <div className=''>{state.작성자}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <label className='left-label'>아이디</label>
                                                    <div className=''>{state.아이디}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <label className='left-label'>제목</label>
                                                    <input type="text" name='subject' id='subject' onChange={onChangeSubject} value={state.제목}/>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <label className='left-label'>내용</label>
                                                    <textarea name="contents" id="contents" cols="30" rows="10" onChange={onChangeContents} value={state.내용}></textarea>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="button-box">
                                        <button type='submit'>등록</button>
                                    </div>

                               </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
