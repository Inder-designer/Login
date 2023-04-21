import { Button, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import UserData from './data.json'

const USER_REGEX = /^[a-zA-Z]{3,23}$/;
const Login = () => {
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    // const userRef = useRef()
    // const errRef = useRef()
    console.log(Email,'Email>>>');
    console.log(Password,'Password>>>');
    // useEffect(() => {
    //   userRef.current.focus()
    // }, [])

    // useEffect(() => {
    //   setErrMsg('')
    // },[Email, Password])

    let emailValue = UserData.data.filter((val) => val.Email === Email && val.Password === Password )

    const loginForm = (e) => {
        // console.log(emailValue, 'emailValueemailValueemailValue')

        if (emailValue.length>0 )  {
            console.log("Submit")
          } else {
            e.preventDefault()
            setErrMsg('Invalid email and password')
            // window.alert('Invalid email and password')
          }
          
      localStorage.setItem('EmailLocal', Email);
      localStorage.setItem('PasswordLocal', Password);
    }
    // let login = false
  return (
    <div>
        {/* {
          (login === true ) ? <p>Hello World</p> : <p>Bye World</p>
        } */}
        <form  action='/' onSubmit={loginForm} className="loginFOrm">
            <p
              className={`  text-danger  `}
            >
              {errMsg}
            </p>  
            <TextField
              className='w-100 mb-3'
              required
              id="email"
              label="Email"
              inputProps={{
                autocomplete: 'Email',
                form: {
                  autocomplete: 'off',
                },
              }}
              // ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={Email}
            />
            <TextField
              required
              className='w-100 mb-3'
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='text-center'> 
              <Button type="submit" variant="contained" sx={{marginTop:"20px"}}  >Login</Button>
            </div>
        </form>
        {localStorage.getItem('EmailLocal') && (
            <div>
               Name: <p>{localStorage.getItem('EmailLocal')}</p>
            </div>
         )}
         {localStorage.getItem('PasswordLocal') && (
            <div>
               Password: <p>{localStorage.getItem('PasswordLocal')}</p>
            </div>
         )}

    </div>
  )
}

export default Login