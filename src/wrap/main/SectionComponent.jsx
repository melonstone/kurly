import React from "react";
import './scss/section.scss';
import SectionComponentChild from "./SectionComponentChild";
import axios from "axios";


export default function SectionComponent({num}){
    const [state, setState] = React.useState({
        타임세일: {
            타임세일: false,
            타이머일시: '1970-01-01 00:00:00',
            타임시간: 24,
            캡션1: '',
            캡션2: '',
            캡션3: ''
        },
        이미지경로: '',
        타이틀: '',
        서브타이틀: '',
        타이틀옵션: false,
        애니메이션: false,
        이미지배너: false,
        칸수: 0,
        제품: [],
        n: 0
    });

   React.useEffect(()=>{
        // 컴포넌트 이름을 이용 => 
        // - 이미지경로 지정 상태관리
        // - json 파일이름을 지정
        // let folderName = Section2Component.name.split('Component')[0].toString().toLocaleLowerCase();
        let folderName = `section${num}`;
        axios({
            url: `./data/intro/${folderName}.json`,
            method:'GET'
        })
        .then((result)=>{ // 프로미스 
            setState({
                ...state,

                타임세일: {
                    ...state.타임세일,
                    타임세일: result.data.timeSalse.timeSalse,
                    타이머일시: result.data.timeSalse.timeSalseDate,
                    타임시간: result.data.timeSalse.timeHours,
                    캡션1: result.data.timeSalse.caption1,
                    캡션2: result.data.timeSalse.caption2,
                    캡션3: result.data.timeSalse.caption3    
                },

                이미지경로: folderName,
                타이틀: result.data.title,            // 타이틀
                서브타이틀: result.data.subTitle,      // 서브타이틀
                타이틀옵션: result.data.titleOption,  // 타이틀 옵션
                애니메이션: result.data.animation,    // 애니메이션
                이미지배너: result.data.imageBanner,    // 이미지배너
                칸수: result.data.cols,                 // 칸수

                제품:  result.data.product,           // 제품
                n: result.data.product.length         // 제품의 개수
            })
        })
        .catch((error)=>{
            console.log("AXIOS 오류 " + error );
        });      
    },[]);


    return(
        <section id={`section${num}`} className="section">
            <div className="container">
                {
                state.타이틀옵션 && (    
                    <div className="title">
                        <h2>{state.타이틀}</h2>
                        <p>{state.서브타이틀}</p>
                    </div>
                )
                }
                <div className="content">
                    <SectionComponentChild  타임세일={state.타임세일}  제품={state.제품} n={state.n} 애니메이션={state.애니메이션} 이미지배너={state.이미지배너} 칸수={state.칸수}  이미지경로={state.이미지경로} />
                </div>
            </div>
        </section>
    )
}