import React from 'react';
import logo  from '../logo.svg';
import {Navbar, Nav, Container} from 'react-bootstrap';

function Navigation() {
  return (
  <>
    <Navbar bg="transparent" expand="lg">
        <Container>
            <Navbar.Brand href="/"><img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
            Joonipea</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href='/Design'>Dev Work</Nav.Link>
                <Nav.Link href='/About'>About</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>

  </>
  )
}

export default Navigation;

/*
    <nav className='navbar'>
        <div className='navbar-container'>
            <div class='logo-container'>
            <Link to="/" className="navbar-logo" class="navbar-logo">
                <img src={logo} height='48px' alt='logo'></img><h1 class='logo-text'>Joonipea</h1>
            </Link>
            </div>
            <div class='links-container'>
            <Link to="/Music" className="navbar-link" class="navbar-link">
                Music
            </Link>
            <Link to="/Merch" className="navbar-link" class="navbar-link">
                Merch
            </Link>
            <Link to="/Design" className="navbar-link" class="navbar-link">
                Design
            </Link>
            <Link to="/Merch" className="navbar-link" class="navbar-link">
                Shows
            </Link>
            </div>
        </div>
    </nav>
    

*/