import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';


const Home = () => {
  
  const navigate = useNavigate();
  
  let iToken = localStorage.getItem("token")

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
                (iToken?.length>0) ?
                <Nav.Link href="#home">My Ads</Nav.Link>
                :
                null
              }
              
              {
                (iToken?.length>0) ?
                <button className='btn btn-primary ms-3' onClick={logOut}>Logout</button>
                
                :
                <Nav.Link href="/auth" className='btn btn-primary ms-3 text-white'>Login</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {(iToken?.length>0) ? (
        <EditProfile/>
      ) : null}
    </div>
  )
}

export default Home