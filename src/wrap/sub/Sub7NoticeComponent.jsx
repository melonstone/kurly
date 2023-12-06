import React from 'react';
import './scss/sub7.scss';
import Sub7NoticeLeftComponent from './Sub7NoticeLeftComponent';
import Sub7NoticeComponentChildList from './Sub7NoticeComponentChildList';
import axios from 'axios';

export default function Sub7SignInComponent() {

    const [state, setState] = React.useState({
        공지사항: [],
        공지글수: 0,
        게시글수: 0
    });

    // AXIOS: 한번만 실행
    React.useEffect(()=>{

        axios({
            url: 'http://kyscoo.dothome.co.kr/kurly/green_kurly_notice_table_select2.php',      // 셀렉터 페이지
            method: 'GET'
        })
        .then((res)=>{
            // console.log("AXIOS 성공");
            // console.log(res.data);
            if(res.status===200){
                setState({
                    ...state,
                    공지사항: res.data
                });
            }
            return;
        })
        .catch((err)=>{
            console.log("AXIOS 실패");
            console.log(err);
        });

    },[])
    

    //
    React.useEffect(()=>{

        if(state.공지사항.length > 0){
            let cnt = 0;
            state.공지사항.map((item, idx)=>{
                if(item.타입==='공지'){
                    cnt++;
                }
            });
            setState({
                ...state,
                공지글수: cnt,
                게시글수: state.공지사항.length - cnt
            });
        }

    },[])


    return (
        <main id='sub7'>
            <section id="section1">
                <div className="container">
                    <div className="content sub7_content">

                        {/* left 박스 */}
                        <Sub7NoticeLeftComponent />

                        {/* right 박스 */}
                        <Sub7NoticeComponentChildList 공지사항={state.공지사항} 공지글수={state.공지글수} 게시글수={state.게시글수}/>
                       
                    </div>
                </div>
            </section>
        </main>
    );
};