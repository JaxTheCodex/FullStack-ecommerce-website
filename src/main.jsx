import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from "react-redux";
import Store from './app/Store.js';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import LoginModal from './components/Modal/LoginModal.jsx';
import SignUp from './components/Modal/SignUp.jsx';
import PaymentPage from './components/PaymentPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
    <Toaster position='top-center' reverseOrder={false} />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignUp/>}></Route>
      <Route path='/login' element={<LoginModal/>}></Route>
      <Route path='/Home' element={<App/>}></Route>
      <Route path='/payment' element={<PaymentPage/>}></Route>
    </Routes>
    </BrowserRouter> 
    </Provider>
  </React.StrictMode>
)
