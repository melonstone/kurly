import React from 'react';
import '../wrap/scss/ServiceModal2.scss';
import { useDispatch } from 'react-redux';
import { confirmService2 } from '../reducer/confirmService2Modal';

export default function ServiceModal2Component()  {

    const dispatch = useDispatch();


    const onClickClose=(e)=>{
        e.preventDefault();
        dispatch(confirmService2(false));
        
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.remove('on');
    }

    return (
        <div id='serviceModal'>
            <div className='container'>
                <div className='service-box'>
                    <ul>
                        <li>
                            <h1>개인정보 수집·이용 동의(필수)</h1>
                        </li>
                        <li>
                            <div className="message-box">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>수집 목적</th>
                                            <th>수집 항목</th>
                                            <th>보유 기간</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                                <p className='caption'>
                                    ※ 단, 회원 탈퇴와 별개로 분쟁 조정, 고객문의 대응 및 법령 준수 이력 증빙을 위하여 이메일, 문자, 알림톡 발송이력은 발송일로부터 6개월 보관(이름, 아이디, 휴대폰 번호, 이메일) 후 파기합니다. < br/>
                                < br/>
                                    ※ APPLE 계정을 통해 회원가입 할 경우 *에 해당하는 정보는 추후 서비스 이용과정에서 수집 및 이용됩니다. < br/>
                                < br/>
                                ※ 서비스 제공을 위해서 필요한 최소한의 개인정보입니다. 동의를 해주셔야 서비스를 이용하실 수 있으며, 동의하지 않으실 경우 서비스에 제한이 있을 수 있습니다.
                                < br/>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='button-box'>
                                <button onClick={onClickClose}>확인</button>
                            </div>
                        </li>
                    </ul>
                    
                </div>
                
            </div>
        </div>
    );
};

