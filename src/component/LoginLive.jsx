import { Button, TextField } from '@mui/material'
import React, { useEffect, useRef, useState, useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/login'

const LoginLive = () => {

    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [ tokenG, setTokenG] = useState("")

    const loginForm = async (e) => {
        e.preventDefault()

        try{
            const res = await axios.post(LOGIN_URL,
                {email:Email, password:Password}
            )
        console.log(JSON.stringify(res?.data))
        // console.log(JSON.stringify(res))
        const accessToken = res?.data?.accessToken
        const roles = res?.data?.rales;
        setAuth({Email, Password, roles, accessToken})
        setEmail('')
        setPassword('')
        setSuccess(true)
       localStorage.setItem('token', JSON.stringify(res?.data?.data?.token));
        const tokenP = localStorage.getItem("token")
        console.log(tokenP);
       setTokenG(localStorage.getItem("token"));
       navigate('/')
        } catch (err) {
            console.log(err,"errrrrrr")
            if (!err?.response){
                setErrMsg('No server response')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else if (err.response?.data?.error) {
                toast(err.response?.data?.error)
            } else {
                setErrMsg('Login Failed')
            }
            // errRef.current.focus()
        }

    }
    // console.log((localStorage.getItem("token")));

  return (
    <div>
        <form  action='/' onSubmit={loginForm} className="loginFOrm">
        <ToastContainer />
            <p
              className={`  text-danger  `}
            >
              {errMsg}
            </p>  
            <label htmlFor="email" className='mb-2'>Email</label>
            <TextField
              className='w-100 mb-3'
              required
              id="email"
              autoComplete='off'
              type='email'
              // ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className={ Email === ""? "d-block" : "d-none"} >E-Mail is Required</p>
            <TextField
              required
              className='w-100 mb-3'
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p></p>
            <div className='text-center'> 
              <Button type="submit" variant="contained" sx={{marginTop:"20px"}}  >Login</Button>
            </div>
            <a href="/forgot-password">Forgot Password</a>
        </form>
    </div>
  )
}

export default LoginLive