import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  
  const navigate = useNavigate();
  const [token, setToken] = useState()

  // setToken(localStorage.getItem("token"))
  console.log(localStorage.getItem("token"))
  
  let ff = localStorage.getItem("token")

  // if(!ff){
  //   setToken('hello')
  //   console.log('Welcome')
  // } else {
  //   console.log('Empty')
  // }

  const logOut = () => {
    localStorage.clear();
    navigate('/') 
  } 
  return (
    <div>
      
      {
        (ff?.length>0) ?
        <button onClick={logOut}>Logout</button>
        
        :
        <a href="/auth" className='btn btn-primary' >LoginLocal</a>
      }


    </div>
  )
}

export default Home