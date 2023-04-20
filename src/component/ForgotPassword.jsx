import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import './style.css'
import axios from '../api/axios'
import { ToastContainer, toast } from 'react-toastify'

const FORGOT_URL = '/forgotPassword'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    
    const forgotPswd = async (e) => {
        e.preventDefault()
        
        try{
            const res = await axios.post(FORGOT_URL,
                {domain: 'http://localhost:3000/',email: email}
            )
            console.log(JSON.stringify(res?.data))
            toast(JSON.stringify(res?.data?.message))
        }catch (err) {
            console.log(err);
        }

    }
  return (
    <div>
        <div className="forgotPage">
            <div className="container">
                <ToastContainer />
                <form  action='/' onSubmit={forgotPswd} className="loginFOrm">
                    <h1 className='text-center'>
                        Forgot Password
                    </h1>
                    <p className='text-center'>Enter your email, we will send you an email with link to recover your account</p>
                    <label htmlFor="email" className='mb-2'>Email</label>
                    <TextField
                    className='w-100 mb-3'
                    required
                    type='email'
                    id="email"
                    autoComplete='off'
                    // ref={userRef}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className='text-center'> 
                        <Button type="submit" variant="contained" sx={{marginTop:"20px"}}  >Forgot Password</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword