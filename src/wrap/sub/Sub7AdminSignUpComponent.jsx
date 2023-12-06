import React from 'react';
import './scss/sub7_signup.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAddress } from '../../reducer/isAddress';
import { confirmModal } from '../../reducer/confirmModal';


export default function Sub7AdminSignUpComponent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    

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


    // 온체인지 이벤트 => 자신의 이벤트 구현
    // 상태변수 값 변경되면 => 온체인지 이벤트 => 자신의 이벤트 구현
    const [state, setState] = React.useState({
        아이디:'',
        idGuideText:'',
        아이디중복확인: false,

        비밀번호:'',
        pw1GuideText:'',

        비밀번호확인:'',
        pw2GuideText:'',

        이름:'',
        nameGuideText:'',

        이메일:'',
        emailGuideText:'',
        이메일중복확인: false,

        휴대폰:'',
        발급된인증번호: null,
        입력된인증번호: '',  // 인증번호 받아서 입력한 입력상자 값
        휴대폰번호인증: false,
        isHpNum: false,     // !
        isHpNum2: false,
        isHpNum3: true,  // 인증번호받기

        주소1:'',
        주소2:'',
        isAddress: false

    });


    // 리덕스 상태변수 값 주소1, 주소2 저장되면
    React.useEffect(()=>{

        // 1. 페이지 이동하고
        // 2. 그리고 주소 화면에 띄우기(setTimeout())
        setTimeout(()=>{
            if(selector.address.주소.주소1!=='' && selector.address.주소.주소2!=='' ){
                return (
                    setState({
                        ...state,
                        주소1: selector.address.주소.주소1,
                        주소2: selector.address.주소.주소2,
                        isAddress: true
                    })    
                )
            }
        }, 10);


    },[selector.address.주소.주소1, selector.address.주소.주소2]);




    // 1-1. 아이디
    // 입력상자 키 입력
    // 정규표현식[RegExp]
    // 1. 특수문자 => 입력과 동시 삭제  
    //    -, ], \  3개의 특수문자는 이스케이프 처리 =>  \-, \], \\
    // 2. 영문 혹은(이거나, 또는) 영문과 숫자를 조합(영문필수+, 숫자선택*)
    // 3. 한글 허용안함
    // 4. 공백 허용안함
    // 5. 6자 이상 16자 이하 글자 수 범위
    const onChangeId=(e)=>{
        const   {value} = e.target;
        let     아이디 = '';
        let     idGuideText= '';
        const   regexp1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;
        //const   regexp2 = /[A-Za-z]+[0-9]*/g; // 영문필수, 숫자선택
        const   regexp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g; // 전방탐색 ?= // 후방탐색 ?<= | & ! = +  .  *  ?
        
        // const   regexp2 = /([A-Za-z]+[0-9]+)|([0-9]+[A-Za-z]+)/g; // 영문필수 숫자필수인 경우 버그 그래서 아래의 전방탐색 사용
        // const   regexp2 = /[A-Za-z]+[0-9]+/g; // 영문필수 숫자필수인 경우 버그 그래서 아래의 전방탐색 사용
        // const   regexp2 = /(?=.*[A-Za-z])+(?=.*[0-9])+/g;   // 전방탐색 ?= // 후방택색 ?<=
        const   regexp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const   regexp4 = /\s/g;
        const   regexp5 = /^(.){6,16}$/g;  //^ 처음부터 끝까지 글자 세라  $
        // 아이디 = 입력문자열.replace(정규표현식, '');
        아이디 = value.replace(regexp1, '');

        // 영문필수+, 숫자선택* test() => true, false반환
        // 정규표현식.test(입력문자열) === false 
        // 정규표현식.test(입력문자열) === true 
        if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true  ||  regexp5.test(value)===false ){
            idGuideText = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
        }
        else{
            idGuideText = '';
        }   
        setState({
            ...state,
            아이디: 아이디,
            idGuideText: idGuideText
        });
    }

    // 1-2. 아이디 중복확인 버튼 클릭 이벤트
    const onClickIdBtn=(e)=>{
        e.preventDefault();
        let value = state.아이디;
        let idGuideText= '';
        let 아이디중복확인 = false;

        const   regexp1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;
        const   regexp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const   regexp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const   regexp4 = /\s/g;
        const   regexp5 = /^(.){6,16}$/g;

        if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true  ||  regexp5.test(value)===false ){
            idGuideText = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
            아이디중복확인 = false;
            confirmModalMethod( idGuideText );
            setState({
                ...state,
                아이디중복확인: 아이디중복확인
            });
        }
        else{

            // AXIOS 구현
            const formData = new FormData();
            formData.append('adminId', state.아이디);

            axios({
                url: 'http://kyscoo.dothome.co.kr/kurly/green_kurly_admin_id_duplicate_ok.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                console.log('AXIOS 성공');
                console.log(res.data);
                if(res.status===200){
                    if(res.data===0){
                        idGuideText = '사용할 수 있는 아이디입니다.';
                        아이디중복확인 = true;
                    }
                    else if(res.data===1){
                        idGuideText = '사용 불가능한 아이디입니다.';
                        아이디중복확인 = false;
                    }
                    confirmModalMethod( idGuideText );
                    setState({
                        ...state,
                        아이디중복확인: 아이디중복확인
                    });
                }

            })
            .catch((err)=>{
                console.log('AXIOS 오류');
                console.log(err);
            });
        }
        console.log(selector.confirmModal);
        
    }


    // 2-1. 비밀번호
    // 1. 최소 10자 이상 입력 (10~16)
    // 2. 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합  => 전방탐색
    //    (1) 영문 필수+숫자 필수+  =>  (?=.*[A-Za-z])+(?=.*[0-9])+
    //    (2) 영문 필수+특수문자 필수+ =>  (?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+
    //    (3) 숫자 필수+특수문자 필수+ =>  (?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+
    //    (영문 필수+숫자 필수+) | (영문 필수+특수문자 필수+)  | (숫자 필수+특수문자 필수+)
    //    /((?=.*[영문])+(?=.*[숫자])+)|((?=.*[영문])+(?=.*[특수])+)|((?=.*[숫자])+(?=.*[특수])+)/g;
    // moonjong1234()
    // 1234()%^$#@React(_+)
    // moonjong$#@!&*()
    // moonjong$#@!&*()대한

    // 3. 공백 허용 안함
    // 4. 한글 허용 안함
    // 5. 동일한 숫자 3개 이상 연속 사용 불가
    const onChangePw1=(e)=>{
        const {value} = e.target;
        let pw1GuideText = '';
        const regexp1 = /^(.){10,16}$/g;
        const regexp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)/g;
        const regexp3 = /\s/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        // const regexp5 = /(.)\1\1/g;  // 문자숫자3자연속
        const regexp5 = /(\d)\1\1/g;  // 숫자3자연속

        
        if(regexp1.test(value)===false){
            pw1GuideText = "최소 10자 이상 입력";
        }
        else if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true){
            pw1GuideText = "영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합"
        }
        else if(regexp5.test(value)===true){
            pw1GuideText = "동일한 숫자 3개 이상 연속 사용 불가";
        }
        else{
            pw1GuideText = ""
        }
        setState({
            ...state,
            비밀번호: value,
            pw1GuideText: pw1GuideText
        });
    }
    
    
    // 2-2. 비밀번호확인
    // 비밀번호를 한번 더 입력해 주세요.
    // 동일한 비밀번호를 입력
    const onChangePw2=(e)=>{
        let pw2GuideText = ''
        const {value} = e.target;

        if(value===''){
            pw2GuideText = '비밀번호를 한번 더 입력해 주세요.'
        }
        else if(value!==state.비밀번호){
            pw2GuideText = '동일한 비밀번호를 입력해 주세요.'
        }
        else {
            pw2GuideText = '';
        }

        setState({
            ...state,
            비밀번호확인: value,
            pw2GuideText: pw2GuideText
        });
    }


    // 3. 이름
    // *  한글 숫자 영문 공백허용
    // 1. 이름을 입력해 주세요.
    // 2. 특수문자 => 입력과 동시 삭제
    const onChangeName=(e)=>{
        const {value} = e.target;
        let nameGuideText = '';
        let 이름 = '';
        const regexp = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;

        이름 = value.replace(regexp, '');

        if(이름===''){
            nameGuideText = '이름을 입력해 주세요.';
        }
        else{
            nameGuideText = '';
        }

        setState({
            ...state,
            이름: 이름,
            nameGuideText: nameGuideText
        });
    }


    // 4-1. 이메일
    // /^[영문숫자한글특수]+((\.)?[영문숫자한글특수]+)*@[영문숫자한글특수.]+((\.)?[영문숫자한글특수]+)*\.[영문숫자한글특수.]+$/g;
    // 1. 이메일을 입력해 주세요.
    // 2. @ / ( )  []  \  "  ;  :  < > ,
    // 3. . 0회 1회  ?
    // 4. 영문숫자특수한글@영문숫자특수한글.영문숫자특수한글.com
    // 5. 영문숫자특수한글@영문숫자특수한글.영문숫자특수한글.co.kr {2,3}

    //    @ 좌측 특징 ///////////////////////////////////////////////////////    
    //    @ 앳사인 좌측에 . 점을 찍으면 반드시 다음 문자열이 와야한다.
    ///      ((\.)?[영문숫자한글특수]+)*@

    //    @ 우측 특징 ///////////////////////////////////////////////////////
    //    @ 우측 . 점을 찍으면 반드시 다음 문자열이 와야한다.
    //    ((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*

    //    맨우측 끝에 . 점을 찍으면 반드시 다음 문자열이 와야한다.
    //    \.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+   브라켓안에 점이 없다. 


    //    moonjong123@sshinchon.co.kr
    const onChangeEmail=(e)=>{
        const {value} = e.target;
        let emailGuideText = '';
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;

        if(value===''){
            emailGuideText ='이메일을 입력해 주세요.';
        }
        else if(regexp.test(value)===false){
            emailGuideText ='이메일 형식으로 입력해 주세요.';
        }
        else {
            emailGuideText ='';
        }

        setState({
            ...state,
            이메일: value,
            emailGuideText: emailGuideText
        });
    }


    // 4-2 이메일 중복확인 버튼 클릭 이벤트
    const onClickEmailBtn=(e)=>{
        e.preventDefault();
        let value = state.이메일;
        let emailGuideText = '';
        let 이메일중복확인 = false;

        const regExp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;

        if(value===''){
            emailGuideText = '이메일을 입력해 주세요.';
            이메일중복확인 = false;
            confirmModalMethod( emailGuideText );
            // setState({
            //     ...state,
            //     이메일중복확인: 이메일중복확인
            // });
        }
        else if(regExp.test(value)===false){
            emailGuideText = '이메일 형식으로 입력해 주세요.';
            이메일중복확인 = false;
            confirmModalMethod( emailGuideText );
            // setState({
            //     ...state,
            //     이메일중복확인: 이메일중복확인
            // });
        }
        else{

            // AXIOS 구현
            const formData = new FormData();
            formData.append('adminEmail', state.이메일);

            axios({
                url: 'http://kyscoo.dothome.co.kr/kurly/green_kurly_admin_email_duplicate_ok.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                
                if(res.status===200){
                    if(res.data===0){
                        emailGuideText = '사용할 수 있는 이메일입니다.';
                        이메일중복확인 = true;
                    }
                    else if(res.data===1){
                        emailGuideText = '사용 불가능한 이메일입니다.';
                        이메일중복확인 = false;
                    }
                    confirmModalMethod( emailGuideText );
                    setState({
                        ...state,
                        이메일중복확인: 이메일중복확인
                    });
                }

            })
            .catch((err)=>{
                console.log(`AXIOS 오류`);
                console.log(err);
            });

        }
    }

    // 5-1. 휴대폰번호 입력상자
    const onChangeHp1=(e)=>{        
        let isHpNum = false;

        if(e.target.value.length > 0){
            isHpNum = true
        }
        else {
            isHpNum = false;
        }

        setState({
            ...state,
            휴대폰: e.target.value,
            isHpNum: isHpNum
        });
    }
    
    // 5-2. 휴대폰 인증번호받기 클릭 이벤트
    const onClickHpBtn=(e)=>{
        e.preventDefault();
        const regexp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;
        let num = 0;
        let isHpNum = true; //!
        let isHpNum2 = false;
        let isHpNum3 = true;

        if(state.isHpNum3===true){

            // 0. 잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.
            // 1. 인증번호를 발급하고 6자리 렌덤(Random)번호 생성하여
            // 2. 컨펌모달창에 모달창 열기 그리고 인증번호 전송하기
            // 3. 모달창 인증번호확인(OK)하고  닫기
            // 010 7942 5305
            // 011 348  6441
            // :
            // 019 348  6441            
            num = Math.floor(Math.random() * 900000 + 100000);
            isHpNum = false; //!
            isHpNum2 = false;
            if(regexp.test(state.휴대폰)===false){
                confirmModalMethod('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');             
            }
            else{
                confirmModalMethod(`인증번호가 발송되었습니다.  ${num}`);
                // 다시 버튼을 사용불가로 변환
                // 그리고 아래 인증번호 입력상자가 보인다.
                isHpNum = false;
                isHpNum2 = true;
            }

            setState({
                ...state,
                isHpNum: isHpNum,
                isHpNum2: isHpNum2,
                발급된인증번호: num
            });

        }
        else{  // 다른번호인증 => 인증번호받기
            isHpNum3 = true;  // 인증번호받기버튼 클릭 가능한상태로 변경
            isHpNum = true;  // 인증번호받기 버튼 사용가능
            setState({
                ...state,
                휴대폰:'',
                isHpNum: isHpNum,
                isHpNum3: isHpNum3
            });
        }

    }


    // 5-3. 인증번호입력상자
    const onChangeHp2=(e)=>{
        setState({
            ...state,
            입력된인증번호: e.target.value
        });
    }

    // 5-4. 인증번호 비교 확인 버튼 클릭 이벤트
    const onClickHpBtnOk=(e)=>{
        e.preventDefault();
        let isHpNum  = false;
        let isHpNum2 = false;
        let isHpNum3 = true;
        let 휴대폰번호인증 = false;

        if(state.발급된인증번호 === Number(state.입력된인증번호)){
            confirmModalMethod('인증에 성공 하였습니다.');
            isHpNum  = true; 
            isHpNum2 = false; 
            isHpNum3 = false; 
            휴대폰번호인증 = true;
        }
        else{
            confirmModalMethod('잘못된 인증 코드 입니다.');
            isHpNum2 = true;  // 다시 입력 대기
            isHpNum  = false; 
            isHpNum3 = true; 
            휴대폰번호인증 = false;
        }

        setState({
            ...state,
            isHpNum: isHpNum,
            isHpNum2: isHpNum2,
            isHpNum3: isHpNum3,
            휴대폰번호인증: 휴대폰번호인증
        });

    }

    
    // 6-1. 주소검색 버튼 클릭 이벤트 => 주소검색 모달창 오픈
    const onClickAddressSearch=(e)=>{
        e.preventDefault();
        
        dispatch(isAddress(true));

    }

    // 6-2. 주소1 입력상자
    const onChangeAddress1=(e)=>{
        setState({
            ...state,
            주소1: e.target.value
        });
    }

    // 6-3. 주소2 입력상자
    const onChangeAddress2=(e)=>{
        setState({
            ...state,
            주소2: e.target.value
        });
    }
    

    // 7-1. 유효성 검사
    // 7-2. DB서버에 폼전송하기
    const onSubmitForm=(e)=>{
        e.preventDefault();


        if(state.아이디===''){
            confirmModalMethod('아이디를 입력하세요.');
        }
        else if(state.아이디중복확인===false){
            confirmModalMethod('아이디 중복확인을 해주세요.');
        }
        else if(state.비밀번호===''){
            confirmModalMethod('비밀번호를 입력하세요.');
        }
        else if(state.비밀번호확인===''){
            confirmModalMethod('비밀번호를 한번 더 입력하세요.');
        }
        else if(state.이름===''){
            confirmModalMethod('비밀번호를 입력하세요.');
        }
        else if(state.이메일===''){
            confirmModalMethod('이메일을 입력하세요.');
        }
        else if(state.이메일중복확인===false){
            confirmModalMethod('이메일 중복확인을 해주세요.');
        }
        else if(state.휴대폰===''){
            confirmModalMethod('휴대폰번호를 입력하세요.');
        }
        else if(state.휴대폰번호인증===false){
            confirmModalMethod('휴대폰 번호를 인증해주세요.');
        }
        else if(state.주소1===''){
            confirmModalMethod('주소를 검색해주세요.');
        }
        else if(state.주소2===''){
            confirmModalMethod('나머지주소를 입력해주세요.');
        }
        else {  // 유효성 검사 성공적으로 완료되면 데이터 전송

            const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;

            // 폼데이터는 formData 만들어서 내용을 추가해서 보내줘야 한다.
            // AJAX는 data: {} 해서 보내기 가능
            const formData = new FormData();
            formData.append('adminId',       state.아이디);
            formData.append('adminPw',       state.비밀번호);
            formData.append('adminName',     state.이름);
            formData.append('adminEmail',    state.이메일);
            formData.append('adminHp',       state.휴대폰.replace(regExp, '$1-$2-$3'));
            formData.append('adminAddress',  `${state.주소1}, ${state.주소2}`);

            axios({
                url: 'http://kyscoo.dothome.co.kr/kurly/green_kurly_admin_signup.php',
                method: 'POST',
                data: formData      // 클라이언트가 서버에게 요청 Request
            })
            .then((res)=>{
                
                if(res.status===200){   // 전송성공: res.status===200
                    console.log(res.data);  // 서버가 클라이언트에게 응답 Response
                    if(res.data===1){   // 인트로 페이지로 이동하는 라우터 네비게이션 구현
                        
                        // 컨펌모달창 닫기 => 인트로 페이지로 이동 내비게이션 구현
                        confirmModalMethod('관리자 회원가입이 완료되었습니다.');
                    }
                    else if(res.data===0){  // 회원가입 실패 확인하고 다시 시도
                        confirmModalMethod('가입에 실패했습니다.');
                    }
                }
            })
            .catch((err)=>{
                console.log('AXIOS 전송실패!');
                console.log(err);
            });
            
        }
    }


    return (
        <main id='sub7' className='sub7-signup'>
            <section id="signUp">
                <div className="container">

                    <div className="title">
                        <h2 className="title-text title1">MyAdmin</h2>
                        <h4 className="title-text title2">회원가입</h4>
                        <div className="sub-title">
                            <h3><i>*</i><span>필수입력사항</span></h3>
                        </div>
                    </div>
                    
                    <div className="content sub5-content">
                       <form onSubmit={onSubmitForm}>
                            <ul className='signup-form'>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminId"><span>아이디</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text" 
                                                maxLength={16}
                                                name='adminId' 
                                                id='adminId' 
                                                placeholder='아이디를 입력해주세요' 
                                                value={state.아이디}  
                                                onChange={onChangeId}
                                            />
                                        </div>

                                        <div className="right-box">
                                            <button onClick={onClickIdBtn}>중복확인</button>
                                        </div>
                                        <p className={`guide-text${state.idGuideText!==''?' on':''}`}>{state.idGuideText}</p>  
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminPw1"><span>비밀번호</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="password"
                                                maxLength={16}   
                                                name='adminPw1' 
                                                id='adminPw1' 
                                                placeholder='비밀번호를 입력해주세요' 
                                                value={state.비밀번호} 
                                                onChange={onChangePw1}
                                            />
                                        </div>

                                        <div className="right-box">
                                           
                                        </div>
                                        <p className={`guide-text${state.pw1GuideText!==''?' on':''}`}>{state.pw1GuideText}</p>  
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminPw2"><span>비밀번호확인</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="password" 
                                                maxLength={16}  
                                                name='adminPw2' 
                                                id='adminPw2' 
                                                placeholder='비밀번호를 한번 더 입력해주세요' 
                                                value={state.비밀번호확인} 
                                                onChange={onChangePw2}
                                            />
                                        </div>

                                        <div className="right-box">
                                            
                                        </div>
                                        <p className={`guide-text${state.pw2GuideText!==''?' on':''}`}>{state.pw2GuideText}</p>  
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminName"><span>이름</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text"   
                                                name='adminName' 
                                                id='adminName' 
                                                placeholder='이름을 입력해주세요' 
                                                value={state.이름} 
                                                onChange={onChangeName}
                                            />
                                        </div>

                                        <div className="right-box">
                                            
                                        </div>
                                        <p className={`guide-text${state.nameGuideText!==''?' on':''}`}>{state.nameGuideText}</p>  
                                    </div>                                   
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminEmail"><span>이메일</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text"   
                                                name='adminEmail' 
                                                id='adminEmail' 
                                                placeholder='이메일을 입력해주세요'  
                                                value={state.이메일} 
                                                onChange={onChangeEmail}
                                            />
                                        </div>

                                        <div className="right-box">
                                            <button onClick={onClickEmailBtn}>중복확인</button>
                                        </div>
                                        <p className={`guide-text${state.emailGuideText!==''?' on':''}`}>{state.emailGuideText}</p>   
                                    </div>
                                </li>
                                <li className='list hp1'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminHp"><span>휴대폰</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text" 
                                                maxLength={11}  
                                                name='adminHp' 
                                                id='adminHp' 
                                                placeholder='숫자만 입력해주세요' 
                                                value={state.휴대폰} 
                                                onChange={onChangeHp1}
                                            />
                                        </div>

                                        <div className="right-box">
                                            <button 
                                                disabled={!state.isHpNum} 
                                                className={`hp-btn${state.isHpNum?'':' off'}`}
                                                onClick={onClickHpBtn}
                                            >{state.isHpNum3?'인증번호받기':'다른번호인증'}</button>
                                        </div>
                                        <p className='guide-text'></p>  
                                    </div>
                                </li>
                                {
                                    state.isHpNum2 && (
                                        <>
                                            <li className='list hp2'>
                                                <div className="list-box">
                                                
                                                    <div className="input-box">
                                                        <input 
                                                            type="text"   
                                                            name='adminHpAuthen' 
                                                            id='adminHpAuthen' 
                                                            placeholder='인증번호를 입력해주세요'  
                                                            value={state.인증번호} 
                                                            onChange={onChangeHp2}
                                                        />
                                                        <span className='time-box'><em>03</em><em>00</em></span>
                                                    </div>

                                                    <div className="right-box">
                                                        <button onClick={onClickHpBtnOk}>인증번호확인</button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='list hp3'>
                                                <div className="list-box">
                                                    
                                                    <p className='guide-text show'>
                                                        인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (컬리 1644-1107)
                                                    </p>
                                                                                        
                                                </div>
                                            </li>
                                        </>
                                    )
                                }
                                <li className='list address1'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor=""><span>주소</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">                                            
                                            {
                                                !state.isAddress && (
                                                    <button onClick={onClickAddressSearch} className='address-search-btn'>주소검색</button>
                                                )
                                            }
                                            {
                                                state.isAddress && (
                                                    <input 
                                                        type="text"   
                                                        name='adminAddress1' 
                                                        id='adminAddress1' 
                                                        placeholder='검색 주소' 
                                                        value={state.주소1} 
                                                        onChange={onChangeAddress1}
                                                    />
                                                )
                                            }
                                        </div>

                                        <div className="right-box">
                                            {
                                                state.isAddress && (
                                                    <button onClick={onClickAddressSearch}>재검색</button>
                                                )  
                                            }
                                        </div>

                                    </div>
                                </li>
                                {
                                    state.isAddress && (
                                        <>
                                            <li className='list address2'>
                                                <div className="list-box">
                                                
                                                    <div className="input-box">
                                                        <input 
                                                            type="text"   
                                                            name='adminAddress2' 
                                                            id='adminAddress2' 
                                                            placeholder='나머지 주소를 입력하세요'  
                                                            value={state.주소2} 
                                                            onChange={onChangeAddress2}
                                                        />
                                                    </div>
                                                    
                                                </div>
                                            </li>
                                            <li className='list address3'>
                                                <div className="list-box">
                                                
                                                    <p className='guide-text show'>
                                                        <strong>샛별배송</strong>
                                                        배송지에 따라 상품 정보가 달라질 수 있습니다.
                                                    </p>

                                                </div>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                            <div className="button-box">
                                <button type='submit'>가입하기</button>
                            </div>
                       </form>
                    </div>

                </div>
            </section>
        </main>
    );
};
