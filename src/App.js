import './App.css';
import AuthPage from './component/AuthPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
                    <ToastContainer />

      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/auth' element={<AuthPage/>} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
