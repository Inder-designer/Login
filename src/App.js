import './App.css';
import AuthPage from './component/AuthPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import ForgotPassword from './component/ForgotPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/auth' element={<AuthPage/>} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
