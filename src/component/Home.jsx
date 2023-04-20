import React, { useEffect, useState } from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const INFO_URL = '/me'

const Home = () => {
  
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState('  ')

  // setToken(localStorage.getItem("token"))
  // console.log(localStorage.getItem("token"))
  
  let ff = localStorage.getItem("token")

  useEffect( () => {
    
    async function fetchUserInfo() {
      try{
        const res = await axios.get(INFO_URL,{
          headers:{
            'Authorization':JSON.parse(ff)
          }
        });
       
        setUserInfo(res.data.data);
      } catch(err) {
        // console.log(err, "Error>>>>>>>");
      }
    }
    fetchUserInfo()
    
  },[])
  // if(!ff){
  //   setToken('hello')
  //   console.log('Welcome')
  // } else {
  //   console.log('Empty')
  // }

  const logOut = () => {
    localStorage.clear();
    window.location.reload()
  } 
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              {
                (ff?.length>0) ?
                <Nav.Link href="#home">My Ads</Nav.Link>
                :
                null
              }
              
              {
                (ff?.length>0) ?
                <button className='btn btn-primary ms-3' onClick={logOut}>Logout</button>
                
                :
                <Nav.Link href="/auth" className='btn btn-primary ms-3 text-white'>Login</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className='userInfo'>
              <div className="container">
                <ul className="list-unstyled p-0 m-0">
                  <li><span>Name:</span> {userInfo.firstName}</li>
                  <li><span>Username:</span> {userInfo.username}</li>
                  <li><span>Email:</span> {userInfo.email}</li>
                  <li className='mt-3'><button className='btn btn-primary'>Edit Profile</button></li>
                </ul>
              </div>
      </section>

    </div>
  )
}

export default Home