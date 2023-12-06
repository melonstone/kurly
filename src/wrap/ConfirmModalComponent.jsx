import React from 'react';
import '../wrap/scss/ConfirmModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { confirmModal } from '../reducer/confirmModal';

export default function ConfirmModalComponent()  {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);


    const onClickCloseBtn=(e)=>{
        e.preventDefault();



        if(selector.confirmModal.confirmMsg==='회원가입을 진심으로 감사드립니다.'){  // 회원가입 후
            
            const value = {
                isConfirmModal: false,
                confirmMsg: '',
                join: true
            }

            dispatch(confirmModal(value));
            
        }
        else if(selector.confirmModal.confirmMsg==='비밀번호 변경이 완료되었습니다.'){  // 비밀번호 재설정 후
            
            const value = {
                isConfirmModal: false,
                confirmMsg: '',
                join: false
            }
            
            dispatch(confirmModal(value));
    
            setTimeout(()=>{            // 비동기식(ASYN 순차실행)
                // router로 구현되지 않은 컴포넌트라 useNavigate 사용불가
                window.location.pathname = '/sub6';
            },100)
            
        }
        else if(selector.confirmModal.confirmMsg==='관리자 비밀번호 변경이 완료되었습니다.'){  // 비밀번호 재설정 후
            
            const value = {
                isConfirmModal: false,
                confirmMsg: '',
                join: false
            }
            
            dispatch(confirmModal(value));
    
            setTimeout(()=>{            // 비동기식(ASYN 순차실행)
                // router로 구현되지 않은 컴포넌트라 useNavigate 사용불가
                window.location.pathname = '/sub7AdminSignIn';
            },100)
            
        }
        else{
            
            const value = {
                isConfirmModal: false,
                confirmMsg: '',
                join: false
            }

            dispatch(confirmModal(value));
        }

        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.remove('on');
    }

    return (
        <div id='confirmModal'>
            <div className='container'>
                <div className='confirm-box'>
                    <ul>
                        <li>
                            <div className='message-box'>
                                {
                                    // \n 기준으로 잘라서 줄바꿈
                                    selector.confirmModal.confirmMsg.split('\n').map((item)=>{
                                        return (
                                            <p>{item}</p>
                                        )
                                    })
                                }
                            </div>                             
                        </li>
                        <li>
                            <div className='button-box'>
                                <button onClick={onClickCloseBtn}>확인</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

