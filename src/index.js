import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapComponent from './WrapComponent.jsx';

// 3. 리덕스 툴킷 임포트
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import address from './reducer/address.js';
import confirmModal from './reducer/confirmModal.js';
import confirmService1 from './reducer/confirmService1Modal.js';
import confirmService2 from './reducer/confirmService2Modal.js';
import confirmService3 from './reducer/confirmService3Modal.js';
import isAddress from './reducer/isAddress.js';
import mainModal from './reducer/mainModal.js';
import quickMenuViewProduct from './reducer/quickMenuViewProduct.js';
import topModal from './reducer/topModal.js';
import viewProduct from './reducer/viewProduct.js';
import viewProductIsFlag from './reducer/viewProductIsFlag.js';
import signIn from './reducer/signIn.js';

// 4. 스토어(store) 생성
let store = configureStore({
  reducer: {
    // isAddress: isAddress
    // 바로 가져와서 쓰는 것도 가능하다.
    address,
    confirmModal,
    confirmService1,
    confirmService2,
    confirmService3,
    isAddress,
    mainModal,
    quickMenuViewProduct,
    topModal,
    viewProduct,
    viewProductIsFlag,
    signIn
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
      <Provider store={store} >  {/* // 5. 프로바이더 스토어를 내려보낸다. */}
        <WrapComponent />
      </Provider>
  </React.StrictMode>
);