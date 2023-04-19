import { Button, TextField } from '@mui/material'
import React, { useRef, useState, useEffect} from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../api/axios'
import Login from './Login'

// const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
  
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-z1-9-_.]{3,25}@([a-z]+\.)[a-z]{2,4}$/;
const REGISTER_URL = '/save-user'

const Signup = () => {
    const userRef = useRef();
    const errRef = useRef()
    
    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [pswd, setPswd] = useState("");
    const [validPswd, setValidPswd] = useState(false);
    const [pswdFocus, setPswdFocus] = useState(false);
    
    const [matchPswd, setMatchPswd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
      userRef.current.focus()
    }, [])
    
    useEffect(() => {
      const result = USER_REGEX.test(user);
      // console.log(result);
      // console.log(user);
      setValidName(result);
    }, [user])
    useEffect(() => {
      const result = EMAIL_REGEX.test(email);
      // console.log(result);
      // console.log(email);
      setValidEmail(result);
    }, [email])
    useEffect(() => {
      const result = PWD_REGEX.test(pswd);
      // console.log(result);
      // console.log(pswd);
      setValidPswd(result);
      const match = pswd === matchPswd;
      setValidMatch(match);
    }, [pswd, matchPswd])

    useEffect(() => {
      setErrMsg('')
    }, [user, pswd, matchPswd])
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v1 = USER_REGEX.test(user);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(pswd);
        if(!v1 || !v2 || !v3){
          setErrMsg("Invalid Entry")
          return;
        }
        
        try{
          const res = await axios.post(REGISTER_URL,
            {firstName:user,lastName:"    ", email:email, password:pswd},
            // {
            //   headers: { 'Content-Type': 'application/json'},
            //   withCredentials: true
            // }
          );
          
          console.log(res.data);
          console.log(res.accessToken);
          console.log(JSON.stringify(res));
          setSuccess(true)
        } catch (err){

          console.log(err,"errrrrrr")
          alert(err?.response?.data?.error) 
          if (err.response?.status === 409) {
            setErrMsg('Username Taken')
          } else {
            setErrMsg('Registration Failed')
          }
          errRef.current.focus()
        }

        // console.log(user,email,pswd);
        // setSuccess(true);
    }

  return (
    <div>
      {success ? ( <div> <h1>Success!</h1> </div>) : ("") }
        <form className="signupFOrm" onSubmit={handleSubmit}>
            <p ref={errRef} className={ errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
            <label htmlFor="username" className='mb-2'>
              Username*
              <span className={validName ? "d-inline" : "d-none"}> <FontAwesomeIcon icon={faCheck} /></span>
              <span className={validName || !user ? "d-none" : "d-inline"}> <FontAwesomeIcon icon={faTimes} /></span>
            </label>
            <TextField
                className='w-100 mb-3'
                id="username"
                // label="Username"
                type='text'
                defaultValue=""
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                inputProps={{
                    autocomplete: 'Email',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
            />
            <p id='uidnote' className={userFocus && user && !validName ? "d-block" : "d-none"}>
              <FontAwesomeIcon icon={faInfoCircle}/>
              4 to 24 characters. <br/>
              Must letter begin with a letter.
            </p>

            {/* Email  */}
            <label htmlFor="email" className='mb-2'>
              Email*
              <span className={validEmail ? "d-inline" : "d-none"}> <FontAwesomeIcon icon={faCheck} /></span>
              <span className={validEmail || !email ? "d-none" : "d-inline"}> <FontAwesomeIcon icon={faTimes} /></span>
            </label>
            <TextField
                className='w-100 mb-3'
                id="email"
                // label="Email"
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                defaultValue=""
                inputProps={{
                    autocomplete: 'Email',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
            />
            <p id='emailnote' className={emailFocus && email && !validEmail ? "d-block" : "d-none"}>
              <FontAwesomeIcon icon={faInfoCircle}/>
              example@gmail.com.
            </p>

            {/* Password  */}
            <label htmlFor="password" className='mb-2'>
              Password*
              <span className={validPswd ? "d-inline" : "d-none"}> <FontAwesomeIcon icon={faCheck} /></span>
              <span className={validPswd || !pswd ? "d-none" : "d-inline"}> <FontAwesomeIcon icon={faTimes} /></span>
            </label>
            <TextField
            className='w-100 mb-3'
            id="password"
            // label="Password"
            type="password"
            onChange={(e) => setPswd(e.target.value)}
            required
            aria-invalid={validPswd ? "false" : "true"}
            aria-describedby="pswdnote"
            onFocus={() => setPswdFocus(true)}
            onBlur={() => setPswdFocus(false)}
            autoComplete='off'
            />
            <p id='pswdnote' className={pswdFocus && !validPswd ? "d-block" : "d-none"}>
              <FontAwesomeIcon icon={faInfoCircle}/>
              8 to 24 characters. <br/>
              Must include uppercase and lowercase letters, a number and a special character. <br />
              Allowed special character: <span>!</span><span>@</span><span>#</span><span>$</span><span>%</span>
            </p>

            {/* Confirm Password  */}
            <label htmlFor="confirm_password" className='mb-2'>
              Confirm Password*
              <span className={validMatch && matchPswd ? "d-inline" : "d-none"}> <FontAwesomeIcon icon={faCheck} /></span>
              <span className={validMatch || !matchPswd ? "d-none" : "d-inline"}> <FontAwesomeIcon icon={faTimes} /></span>
            </label>
            <TextField
            className='w-100 mb-3'
            id="confirm_password"
            // label="Confirm Password"
            type="password"
            onChange={(e) => setMatchPswd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}
            />
            <p id='confirmnote' className={matchFocus && !validMatch ? "d-block" : "d-none"}>
              <FontAwesomeIcon icon={faInfoCircle}/>
              Must match the first password input field 
            </p>
            <div className='text-center'> 
                <Button variant="contained" type='submit'  sx={{marginTop:"20px"}} >Signup</Button>
            </div>
        </form>
    </div>
  )
}

export default Signup